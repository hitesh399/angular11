interface BaseModelAttribute {
  id?: string;
  editMode?: boolean;
}

export class BaseModel<T extends BaseModelAttribute> {
  
  protected attributes: T;
  protected cloneAttributes: T;

  constructor(data: T) {
    this.attributes = { ...data, id: this.generateId(), editMode: false };
    this.cloneAttributes = JSON.parse(JSON.stringify(this.attributes));
  }

  set editMode(value: boolean) {
    this.cloneAttributes = JSON.parse(JSON.stringify(this.attributes));
    this.attributes.editMode = value;
  }
  get id(): string {
    return this.attributes.id ? this.attributes.id : '';
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
