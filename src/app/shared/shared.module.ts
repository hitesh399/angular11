import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from './toast/toast.module';
import { SubmitButtonModule } from './button/submit/submit-button.module';
// import { FooterModule } from './footer/footer.module';
// import { NavbarModule } from './navbar/navbar.module';
// import { SidebarModule } from './sidebar/sidebar.module';
// import { ValidationModule } from './validation/validation.module';
// import { ImageFormControlModule } from './custom-form-controls/image/image-form-control.module';
// import { FileFormControlModule } from './custom-form-controls/file/file-form-control.module';

@NgModule({
    declarations: [
    ],
    imports: [
        /** Start Node Modules */
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        /** ENd  Node Modules */

        /** Start Shared Modules*/
        ToastModule,
        SubmitButtonModule,
        // FooterModule,
        // NavbarModule,
        // SidebarModule,
        // ValidationModule,
        // ImageFormControlModule,
        // FileFormControlModule
        /** End Shared Modules */
    ],
    exports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        // NgbModule,
        /** ENd  Node Modules */

        /** Start Shared Modules*/
        ToastModule,
        SubmitButtonModule,
        // FooterModule,
        // NavbarModule,
        // SidebarModule,
        // ValidationModule,
        // ImageFormControlModule,
        // FileFormControlModule
    ]
})

export class SharedModule { }