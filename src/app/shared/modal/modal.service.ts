import { Injectable, ComponentFactoryResolver, Injector, Inject, TemplateRef, Type, ApplicationRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContract } from './modal.contract';

export type Content<T> = string | TemplateRef<T> | Type<T>;

let numberOfOpenModal = 0

@Injectable()
export class ModalService {
    constructor(private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private appRef: ApplicationRef
    ) {

    }
    open<T>(content: Content<T>, options: ModalContract = {}) {
        const modal = new ModalSingleService(this.resolver, this.injector, this.document, this.appRef)
        return modal.open(content, options)
    }
}

class ModalSingleService {
    componentRef: any;
    options: ModalContract;
    callBack: Function;
    disabled: Boolean = false;
    childcComponentRef: any;
    resloveFnc: Function;
    rejectFnc: Function;

    constructor(private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private appRef: ApplicationRef
    ) {
        this.close = this.close.bind(this)
        this.disable = this.disable.bind(this)
        this.enable = this.enable.bind(this)
    }

    open<T>(content: Content<T>, options: ModalContract = {}) {
        numberOfOpenModal++
        return new Promise((resolve, reject) => {
            this.resloveFnc = resolve
            this.rejectFnc = reject
            this.options = options
            const factory = this.resolver.resolveComponentFactory(ModalComponent);
            const ngContent = this.resolveNgContent(content);
            this.componentRef = factory.create(this.injector, ngContent);

            (<ModalComponent>this.componentRef.instance).modal = this

            const { title, modalClass, insideModalBody, persistent, showCancelBtn, cancelBtnLabel, showOKBtn, okBtnLabel, showFooter } = this.options
            if (title)
                (<ModalComponent>this.componentRef.instance).title = title;

            if (persistent)
                (<ModalComponent>this.componentRef.instance).persistent = persistent;

            if (showCancelBtn)
                (<ModalComponent>this.componentRef.instance).showCancelBtn = showCancelBtn;

            if (cancelBtnLabel)
                (<ModalComponent>this.componentRef.instance).cancelBtnLabel = cancelBtnLabel;

            if (showOKBtn)
                (<ModalComponent>this.componentRef.instance).showOKBtn = showOKBtn;

            if (okBtnLabel)
                (<ModalComponent>this.componentRef.instance).okBtnLabel = okBtnLabel;

            if (modalClass)
                (<ModalComponent>this.componentRef.instance).modalClass = modalClass;

            if (showFooter !== undefined)
                (<ModalComponent>this.componentRef.instance).showFooter = showFooter;

            if (insideModalBody !== undefined)
                (<ModalComponent>this.componentRef.instance).insideModalBody = insideModalBody;

            this.appRef.attachView(this.componentRef.hostView)

            const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            // console.log('domElem', domElem, numberOfOpenModal)
            this.document.body.appendChild(domElem);

            this.componentRef.hostView.detectChanges();
            // this.componentRef
            this.document.body.classList.add('modal-open')

            if (numberOfOpenModal > 1) {
                let backdropIndex = 1040 + 10 + numberOfOpenModal
                let modalIndex = backdropIndex + 10;
                let backdropElm = domElem.querySelector('.modal-backdrop') as HTMLDivElement;
                let backElm = domElem.querySelector('.modal') as HTMLDivElement;
                // domElem.querySelector('.modal')
                if (backdropElm) {
                    backdropElm.style.zIndex = backdropIndex.toString()
                }
                if (backElm) {
                    backElm.style.zIndex = modalIndex.toString()
                }
            }
        })

    }
    close(data: any) {
        this.appRef.detachView(this.componentRef.hostView);
        if (this.childcComponentRef) {
            this.appRef.detachView(this.childcComponentRef.hostView)
        }
        this.componentRef.destroy();
        this.removeclassFromBody()
        this.resloveFnc(data)
    }
    reject(data: any): void {
        this.appRef.detachView(this.componentRef.hostView);
        if (this.childcComponentRef) {
            this.appRef.detachView(this.childcComponentRef.hostView)
        }
        this.componentRef.destroy();
        this.removeclassFromBody()
        this.rejectFnc(data)
    }
    removeclassFromBody() {
        const dyamicModal = this.document.getElementsByClassName('.dynamic-modal')
        if (numberOfOpenModal === 1) {
            this.document.body.classList.remove('modal-open')
        }
        numberOfOpenModal--
    }
    disable() {
        (<ModalComponent>this.componentRef.instance).disabled = true
    }
    enable() {
        (<ModalComponent>this.componentRef.instance).disabled = false
    }
    done(data: any) {
        this.resloveFnc(
            {
                close: this.close,
                disable: this.disable,
                enable: this.enable,
                _this: this.childcComponentRef.instance
            }
        )
    }
    resolveNgContent<T>(content: Content<T>) {
        if (typeof content === 'string') {
            const element = this.document.createTextNode(content);
            return [[element], [element]];
        }

        if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(null);
            return [viewRef.rootNodes];
        }
        const factory = this.resolver.resolveComponentFactory(content);
        const componentRef = factory.create(this.injector);
        const props = this.options.componentInputs ? this.options.componentInputs : {}

        componentRef.instance['modal'] = this
        Object.keys(props).forEach(propKey => {
            componentRef.instance[propKey] = props[propKey]
        })
        this.appRef.attachView(componentRef.hostView)
        componentRef.hostView.detectChanges();
        this.childcComponentRef = componentRef
        return [[componentRef.location.nativeElement], [componentRef.location.nativeElement]];
    }

}