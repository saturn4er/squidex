/*
 * Squidex Headless CMS
 *
 * @license
 * Copyright (c) Squidex UG (haftungsbeschränkt). All rights reserved.
 */

import { booleanAttribute, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscriber, take } from 'rxjs';
import { DialogService, Types } from '@app/framework/internal';

@Directive({
    selector: '[sqxConfirmClick]',
    standalone: true,
})
export class ConfirmClickDirective {
    @Input()
    public confirmTitle: string | undefined | null;

    @Input()
    public confirmText: string | undefined | null;

    @Input()
    public confirmRememberKey = '';

    @Input({ transform: booleanAttribute })
    public confirmRequired?: boolean | null = true;

    @Output()
    public beforeClick = new EventEmitter();

    @Output('sqxConfirmClick')
    public clickConfirmed = new EventEmitter();

    constructor(
        private readonly dialogs: DialogService,
    ) {
    }

    @HostListener('click', ['$event'])
    public onClick(event: Event) {
        if (this.confirmRequired &&
            this.confirmTitle &&
            this.confirmTitle.length > 0 &&
            this.confirmText &&
            this.confirmText.length > 0) {
            // eslint-disable-next-line deprecation/deprecation
            const destinations = this.clickConfirmed.observers?.map(x => (x as Subscriber<any>)['destination']) || [];

            this.beforeClick.emit();

            this.dialogs.confirm(this.confirmTitle, this.confirmText, this.confirmRememberKey).pipe(take(1))
                .subscribe(confirmed => {
                    if (confirmed) {
                        for (const destination of destinations) {
                            if (Types.isFunction(destination?.next)) {
                                destination.next(true);
                            }
                        }
                    }
                });
        } else {
            this.clickConfirmed.emit();
        }

        event.preventDefault();
    }
}
