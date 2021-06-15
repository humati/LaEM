import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { faBars, fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, fab } from '@fortawesome/free-brands-svg-icons';
import { CarouselComponent } from './carousel/carousel.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent,
    CarouselComponent,
    ContentComponent,
    FooterComponent,
    CarouselItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CarouselModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { 
  constructor(private library: FaIconLibrary)
  {
    library.addIconPacks(fas, fab);
    library.addIcons(faBars, faFacebook);
  }
}
