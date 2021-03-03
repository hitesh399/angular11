interface BaseModelAttribute {
  _id?: string;
  editMode?: boolean;
}

export class BaseModel<T extends BaseModelAttribute> {
  protected attributes: T;
  protected cloneAttributes: T;
  // prototype;

  constructor(data: T) {
    this.attributes = { ...data, _id: this.generateId(), editMode: false };
    this.cloneAttributes = JSON.parse(JSON.stringify(this.attributes));
  }

  set editMode(value: boolean) {
    this.cloneAttributes = JSON.parse(JSON.stringify(this.attributes));
    this.attributes.editMode = value;
  }
  get _id(): string {
    return this.attributes._id ? this.attributes._id : '';
  }
  get editMode() {
    return this.attributes.editMode ? this.attributes.editMode : false;
  }
  get attr(): T {
    return !this.attributes.editMode ? this.attributes : this.cloneAttributes;
  }
  set attr(value) {
    if (!this.attributes.editMode) {
      this.attributes = value;
    } else {
      this.cloneAttributes = value;
    }
  }

  public update(data?: T) {
    this.attributes = {
      ...JSON.parse(JSON.stringify(this.cloneAttributes)),
      ...data,
    };
    return this;
  }
  public toggleEditable() {
    this.editMode = !this.editMode;
  }

  protected updateAttributeKey(key: keyof T, value: any) {
    if (this.attributes.editMode) {
      this.cloneAttributes[key] = value;
    } else {
      this.attributes[key] = value;
    }
  }
  protected generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  public toJSON() {
    const { editMode, ...restAttributes } = this.attributes;
    return restAttributes;
  }
}

export class Model<T> {
  protected attributes: T;
  protected cloneAttributes: T;
  protected editMode = false;
  protected _myId: string;

  constructor(data: T) {
    this._myId = this.generateId();
    this.attributes = { ...data };
    this.cloneAttributes = JSON.parse(JSON.stringify(this.attributes));
    const keys: Array<any> = [
      'attributes',
      'cloneAttributes',
      '_myId',
      '_id',
      'editMode',
      'update',
      'toggleEditable',
      'generateId',
      'toJSON',
    ];

    let handler = {
      get: function (target: Model<T>, prop: keyof T, receiver: any) {
        if (keys.includes(prop)) {
          return Reflect.get(target, prop, receiver);
        }
        if (target.editMode) {
          if (target.cloneAttributes[prop] !== undefined) {
            return target.cloneAttributes[prop];
          }
        } else {
          if (target.attributes[prop] !== undefined) {
            return target.attributes[prop];
          }
        }
      },
      set: function (target: any, prop: keyof T, value: any) {
        if (keys.includes(prop)) {
          if (prop === 'editMode') {
            target.cloneAttributes = JSON.parse(
              JSON.stringify(target.attributes)
            );
          }
          return Reflect.set(target, prop, value);
        }
        if (target.editMode) {
          return Reflect.set(target.cloneAttributes, prop, value);
        } else {
          return Reflect.set(target.attributes, prop, value);
        }
      },
    };
    return new Proxy(this, handler);
  }

  get _id(): string {
    return this._myId ? this._myId : '';
  }

  public update(data?: T) {
    console.log('this.cloneAttributes', this.cloneAttributes);
    this.attributes = {
      ...JSON.parse(JSON.stringify(this.cloneAttributes)),
      ...data,
    };
    this.toggleEditable();
    return this;
  }
  public toggleEditable() {
    this.editMode = !this.editMode;
  }

  protected generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  public toJSON() {
    return this.attributes;
  }
}
