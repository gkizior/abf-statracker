import { HomeComponent } from './home/home.component';
import { StatsListComponent } from './stats-list/stats-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

export const AppRoutes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'ABF StaTracker | HOME' }},
    { path: ':id', component: StatsListComponent, data: { title: 'ABF StaTracker' }},
    { path: '**', redirectTo: '/1', pathMatch: 'full', data: { title: 'ABF StaTracker' }}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
