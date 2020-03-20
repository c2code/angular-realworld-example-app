import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {AuthGuard} from "./core/services/auth-guard.service";

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'mycourses',
    loadChildren: './mycourses/mycourses.module#MycoursesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'mycourses/course',
    loadChildren: './course/course.module#CourseModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'homework',
    loadChildren: './homework/homework.module#HomeworkModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'display',
    loadChildren: './display/display.module#DisplayModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
