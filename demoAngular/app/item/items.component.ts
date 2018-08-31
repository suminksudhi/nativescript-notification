import {Component, Inject, OnInit} from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import {VersionNumber} from "@drifters/nativescript-notification";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    providers: [{provide: 'VersionNumber', useClass: VersionNumber}]
})
export class ItemsComponent implements OnInit {
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService,
                @Inject('VersionNumber') private versionNumber: VersionNumber) { }

    ngOnInit(): void {
        console.log("VersionNumber", this.versionNumber.get());
        this.items = this.itemService.getItems();
    }
}