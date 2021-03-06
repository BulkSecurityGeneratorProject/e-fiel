import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';

@Component({
    selector: 'jhi-categoria-delete-dialog',
    templateUrl: './categoria-delete-dialog.component.html'
})
export class CategoriaDeleteDialogComponent {
    categoria: ICategoria;

    constructor(
        protected categoriaService: CategoriaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoriaListModification',
                content: 'Deleted an categoria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoria-delete-popup',
    template: ''
})
export class CategoriaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoria }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoriaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.categoria = categoria;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/categoria', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/categoria', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
