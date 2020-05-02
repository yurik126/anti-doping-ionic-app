import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { 
    path: 'menu', 
    component: MenuPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: './pages/about/about.module#AboutPageModule'
          }
        ]
      },
      { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
      { path: 'interaction', loadChildren: './pages/interaction/interaction.module#InteractionPageModule' },
      { path: 'substances', loadChildren: './pages/substances/substances.module#SubstancesPageModule' },
      { path: 'prohibited-products', loadChildren: './pages/prohibited-products/prohibited-products.module#ProhibitedProductsPageModule' },
      { path: 'prescriptions/:type', loadChildren: './pages/prescriptions/prescriptions.module#PrescriptionsPageModule' },
      { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule' },
      {path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule'},
      { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
      { path: 'product-details/:id', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
      { path: 'substance-details/:id', loadChildren: './pages/substance-details/substance-details.module#SubstanceDetailsPageModule' },
      { path: 'interaction-details', loadChildren: './pages/interaction-details/interaction-details.module#InteractionDetailsPageModule' },
      {
        path: '',
        redirectTo: '/menu/home',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'interaction-details', loadChildren: './pages/interaction-details/interaction-details.module#InteractionDetailsPageModule' },
  { path: 'interaction', loadChildren: './pages/interaction/interaction.module#InteractionPageModule' },
  { path: 'prescriptions', loadChildren: './pages/prescriptions/prescriptions.module#PrescriptionsPageModule' },
  { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule' },
  { path: 'product-details/:id', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'prohibited-products', loadChildren: './pages/prohibited-products/prohibited-products.module#ProhibitedProductsPageModule' },
  { path: 'substance-details/:id', loadChildren: './pages/substance-details/substance-details.module#SubstanceDetailsPageModule' },
  { path: 'substances', loadChildren: './pages/substances/substances.module#SubstancesPageModule' },
  { path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
