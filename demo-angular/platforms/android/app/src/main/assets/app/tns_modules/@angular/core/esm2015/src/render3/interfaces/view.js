/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** *
 * Size of LViewData's header. Necessary to adjust for it when setting slots.
  @type {?} */
export const HEADER_OFFSET = 16;
/** @type {?} */
export const TVIEW = 0;
/** @type {?} */
export const PARENT = 1;
/** @type {?} */
export const NEXT = 2;
/** @type {?} */
export const QUERIES = 3;
/** @type {?} */
export const FLAGS = 4;
/** @type {?} */
export const HOST_NODE = 5;
/** @type {?} */
export const BINDING_INDEX = 6;
/** @type {?} */
export const DIRECTIVES = 7;
/** @type {?} */
export const CLEANUP = 8;
/** @type {?} */
export const CONTEXT = 9;
/** @type {?} */
export const INJECTOR = 10;
/** @type {?} */
export const RENDERER = 11;
/** @type {?} */
export const SANITIZER = 12;
/** @type {?} */
export const TAIL = 13;
/** @type {?} */
export const CONTAINER_INDEX = 14;
/** @type {?} */
export const CONTENT_QUERIES = 15;
/**
 * `LViewData` stores all of the information needed to process the instructions as
 * they are invoked from the template. Each embedded view and component view has its
 * own `LViewData`. When processing a particular view, we set the `viewData` to that
 * `LViewData`. When that view is done processing, the `viewData` is set back to
 * whatever the original `viewData` was before (the parent `LViewData`).
 *
 * Keeping separate state for each view facilities view insertion / deletion, so we
 * don't have to edit the data array based on which views are present.
 * @record
 */
export function LViewData() { }
/** @enum {number} */
const LViewFlags = {
    /**
       * Whether or not the view is in creationMode.
       *
       * This must be stored in the view rather than using `data` as a marker so that
       * we can properly support embedded views. Otherwise, when exiting a child view
       * back into the parent view, `data` will be defined and `creationMode` will be
       * improperly reported as false.
       */
    CreationMode: 1,
    /** Whether this view has default change detection strategy (checks always) or onPush */
    CheckAlways: 2,
    /** Whether or not this view is currently dirty (needing check) */
    Dirty: 4,
    /** Whether or not this view is currently attached to change detection tree. */
    Attached: 8,
    /**
       *  Whether or not the init hooks have run.
       *
       * If on, the init hooks haven't yet been run and should be executed by the first component that
       * runs OR the first cR() instruction that runs (so inits are run for the top level view before
       * any embedded views).
       */
    RunInit: 16,
    /** Whether or not this view is destroyed. */
    Destroyed: 32,
};
export { LViewFlags };
/**
 * The static data for an LView (shared between all templates of a
 * given type).
 *
 * Stored on the template function as ngPrivateData.
 * @record
 */
export function TView() { }
/**
 * ID for inline views to determine whether a view is the same as the previous view
 * in a certain position. If it's not, we know the new view needs to be inserted
 * and the one that exists needs to be removed (e.g. if/else statements)
 *
 * If this is -1, then this is a component view or a dynamically created view.
 * @type {?}
 */
TView.prototype.id;
/**
 * The template function used to refresh the view of dynamically created views
 * and components. Will be null for inline views.
 * @type {?}
 */
TView.prototype.template;
/**
 * A function containing query-related instructions.
 * @type {?}
 */
TView.prototype.viewQuery;
/**
 * Pointer to the `TNode` that represents the root of the view.
 *
 * If this is a `TNode` for an `LViewNode`, this is an embedded view of a container.
 * We need this pointer to be able to efficiently find this node when inserting the view
 * into an anchor.
 *
 * If this is a `TNode` for an `LElementNode`, this is the TView of a component.
 * @type {?}
 */
TView.prototype.node;
/**
 * Whether or not this template has been processed.
 * @type {?}
 */
TView.prototype.firstTemplatePass;
/**
 * Static data equivalent of LView.data[]. Contains TNodes.
 * @type {?}
 */
TView.prototype.data;
/**
 * The binding start index is the index at which the data array
 * starts to store bindings only. Saving this value ensures that we
 * will begin reading bindings at the correct point in the array when
 * we are in update mode.
 * @type {?}
 */
TView.prototype.bindingStartIndex;
/**
 * Index of the host node of the first LView or LContainer beneath this LView in
 * the hierarchy.
 *
 * Necessary to store this so views can traverse through their nested views
 * to remove listeners and call onDestroy callbacks.
 *
 * For embedded views, we store the index of an LContainer's host rather than the first
 * LView to avoid managing splicing when views are added/removed.
 * @type {?}
 */
TView.prototype.childIndex;
/**
 * Selector matches for a node are temporarily cached on the TView so the
 * DI system can eagerly instantiate directives on the same node if they are
 * created out of order. They are overwritten after each node.
 *
 * <div dirA dirB></div>
 *
 * e.g. DirA injects DirB, but DirA is created first. DI should instantiate
 * DirB when it finds that it's on the same node, but not yet created.
 *
 * Even indices: Directive defs
 * Odd indices:
 *   - Null if the associated directive hasn't been instantiated yet
 *   - Directive index, if associated directive has been created
 *   - String, temporary 'CIRCULAR' token set while dependencies are being resolved
 * @type {?}
 */
TView.prototype.currentMatches;
/**
 * Directive and component defs that have already been matched to nodes on
 * this view.
 *
 * Defs are stored at the same index in TView.directives[] as their instances
 * are stored in LView.directives[]. This simplifies lookup in DI.
 * @type {?}
 */
TView.prototype.directives;
/**
 * Full registry of directives and components that may be found in this view.
 *
 * It's necessary to keep a copy of the full def list on the TView so it's possible
 * to render template functions without a host component.
 * @type {?}
 */
TView.prototype.directiveRegistry;
/**
 * Full registry of pipes that may be found in this view.
 *
 * The property is either an array of `PipeDefs`s or a function which returns the array of
 * `PipeDefs`s. The function is necessary to be able to support forward declarations.
 *
 * It's necessary to keep a copy of the full def list on the TView so it's possible
 * to render template functions without a host component.
 * @type {?}
 */
TView.prototype.pipeRegistry;
/**
 * Array of ngOnInit and ngDoCheck hooks that should be executed for this view in
 * creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.initHooks;
/**
 * Array of ngDoCheck hooks that should be executed for this view in update mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.checkHooks;
/**
 * Array of ngAfterContentInit and ngAfterContentChecked hooks that should be executed
 * for this view in creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.contentHooks;
/**
 * Array of ngAfterContentChecked hooks that should be executed for this view in update
 * mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.contentCheckHooks;
/**
 * Array of ngAfterViewInit and ngAfterViewChecked hooks that should be executed for
 * this view in creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.viewHooks;
/**
 * Array of ngAfterViewChecked hooks that should be executed for this view in
 * update mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.viewCheckHooks;
/**
 * Array of ngOnDestroy hooks that should be executed when this view is destroyed.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.destroyHooks;
/**
 * Array of pipe ngOnDestroy hooks that should be executed when this view is destroyed.
 *
 * Even indices: Index of pipe in data
 * Odd indices: Hook function
 *
 * These must be stored separately from directive destroy hooks because their contexts
 * are stored in data.
 * @type {?}
 */
TView.prototype.pipeDestroyHooks;
/**
 * When a view is destroyed, listeners need to be released and outputs need to be
 * unsubscribed. This cleanup array stores both listener data (in chunks of 4)
 * and output data (in chunks of 2) for a particular view. Combining the arrays
 * saves on memory (70 bytes per array) and on a few bytes of code size (for two
 * separate for loops).
 *
 * If it's a native DOM listener being stored:
 * 1st index is: event name to remove
 * 2nd index is: index of native element in LView.data[]
 * 3rd index is: index of wrapped listener function in LView.cleanupInstances[]
 * 4th index is: useCapture boolean
 *
 * If it's a renderer2 style listener or ViewRef destroy hook being stored:
 * 1st index is: index of the cleanup function in LView.cleanupInstances[]
 * 2nd index is: null
 *
 * If it's an output subscription or query list destroy hook:
 * 1st index is: output unsubscribe function / query list destroy function
 * 2nd index is: index of function context in LView.cleanupInstances[]
 * @type {?}
 */
TView.prototype.cleanup;
/**
 * A list of directive and element indices for child components that will need to be
 * refreshed when the current view has finished its check.
 *
 * Even indices: Directive indices
 * Odd indices: Element indices (adjusted for LViewData header offset)
 * @type {?}
 */
TView.prototype.components;
/**
 * A list of indices for child directives that have host bindings.
 *
 * Even indices: Directive indices
 * Odd indices: Element indices
 *
 * Element indices are NOT adjusted for LViewData header offset because
 * they will be fed into instructions that expect the raw index (e.g. elementProperty)
 * @type {?}
 */
TView.prototype.hostBindings;
/**
 * A list of indices for child directives that have content queries.
 *
 * Even indices: Directive indices
 * Odd indices: Starting index of content queries (stored in CONTENT_QUERIES) for this directive
 * @type {?}
 */
TView.prototype.contentQueries;
/**
 * RootContext contains information which is shared for all components which
 * were bootstrapped with {\@link renderComponent}.
 * @record
 */
export function RootContext() { }
/**
 * A function used for scheduling change detection in the future. Usually
 * this is `requestAnimationFrame`.
 * @type {?}
 */
RootContext.prototype.scheduler;
/**
 * A promise which is resolved when all components are considered clean (not dirty).
 *
 * This promise is overwritten every time a first call to {\@link markDirty} is invoked.
 * @type {?}
 */
RootContext.prototype.clean;
/**
 * RootComponents - The components that were instantiated by the call to
 * {\@link renderComponent}.
 * @type {?}
 */
RootContext.prototype.components;
/** @typedef {?} */
var HookData;
export { HookData };
/** @typedef {?} */
var TData;
export { TData };
/** @typedef {?} */
var CurrentMatchesList;
export { CurrentMatchesList };
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLGFBQWEsYUFBYSxHQUFHLEVBQUUsQ0FBQzs7QUFLaEMsYUFBYSxLQUFLLEdBQUcsQ0FBQyxDQUFDOztBQUN2QixhQUFhLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBQ3hCLGFBQWEsSUFBSSxHQUFHLENBQUMsQ0FBQzs7QUFDdEIsYUFBYSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztBQUN6QixhQUFhLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBQ3ZCLGFBQWEsU0FBUyxHQUFHLENBQUMsQ0FBQzs7QUFDM0IsYUFBYSxhQUFhLEdBQUcsQ0FBQyxDQUFDOztBQUMvQixhQUFhLFVBQVUsR0FBRyxDQUFDLENBQUM7O0FBQzVCLGFBQWEsT0FBTyxHQUFHLENBQUMsQ0FBQzs7QUFDekIsYUFBYSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztBQUN6QixhQUFhLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBQzNCLGFBQWEsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFDM0IsYUFBYSxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUM1QixhQUFhLElBQUksR0FBRyxFQUFFLENBQUM7O0FBQ3ZCLGFBQWEsZUFBZSxHQUFHLEVBQUUsQ0FBQzs7QUFDbEMsYUFBYSxlQUFlLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlJaEMsZUFBdUI7O0lBR3ZCLGNBQXNCOztJQUd0QixRQUFnQjs7SUFHaEIsV0FBbUI7Ozs7Ozs7O0lBU25CLFdBQWtCOztJQUdsQixhQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOFJ0QixhQUFhLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJy4uLy4uL2xpbmtlcic7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcblxuaW1wb3J0IHtMQ29udGFpbmVyfSBmcm9tICcuL2NvbnRhaW5lcic7XG5pbXBvcnQge0NvbXBvbmVudFF1ZXJ5LCBDb21wb25lbnRUZW1wbGF0ZSwgRGlyZWN0aXZlRGVmSW50ZXJuYWwsIERpcmVjdGl2ZURlZkxpc3QsIFBpcGVEZWZJbnRlcm5hbCwgUGlwZURlZkxpc3R9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0xDb250YWluZXJOb2RlLCBMRWxlbWVudE5vZGUsIExWaWV3Tm9kZSwgVE5vZGV9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0xRdWVyaWVzfSBmcm9tICcuL3F1ZXJ5JztcbmltcG9ydCB7UmVuZGVyZXIzfSBmcm9tICcuL3JlbmRlcmVyJztcblxuLyoqIFNpemUgb2YgTFZpZXdEYXRhJ3MgaGVhZGVyLiBOZWNlc3NhcnkgdG8gYWRqdXN0IGZvciBpdCB3aGVuIHNldHRpbmcgc2xvdHMuICAqL1xuZXhwb3J0IGNvbnN0IEhFQURFUl9PRkZTRVQgPSAxNjtcblxuLy8gQmVsb3cgYXJlIGNvbnN0YW50cyBmb3IgTFZpZXdEYXRhIGluZGljZXMgdG8gaGVscCB1cyBsb29rIHVwIExWaWV3RGF0YSBtZW1iZXJzXG4vLyB3aXRob3V0IGhhdmluZyB0byByZW1lbWJlciB0aGUgc3BlY2lmaWMgaW5kaWNlcy5cbi8vIFVnbGlmeSB3aWxsIGlubGluZSB0aGVzZSB3aGVuIG1pbmlmeWluZyBzbyB0aGVyZSBzaG91bGRuJ3QgYmUgYSBjb3N0LlxuZXhwb3J0IGNvbnN0IFRWSUVXID0gMDtcbmV4cG9ydCBjb25zdCBQQVJFTlQgPSAxO1xuZXhwb3J0IGNvbnN0IE5FWFQgPSAyO1xuZXhwb3J0IGNvbnN0IFFVRVJJRVMgPSAzO1xuZXhwb3J0IGNvbnN0IEZMQUdTID0gNDtcbmV4cG9ydCBjb25zdCBIT1NUX05PREUgPSA1O1xuZXhwb3J0IGNvbnN0IEJJTkRJTkdfSU5ERVggPSA2O1xuZXhwb3J0IGNvbnN0IERJUkVDVElWRVMgPSA3O1xuZXhwb3J0IGNvbnN0IENMRUFOVVAgPSA4O1xuZXhwb3J0IGNvbnN0IENPTlRFWFQgPSA5O1xuZXhwb3J0IGNvbnN0IElOSkVDVE9SID0gMTA7XG5leHBvcnQgY29uc3QgUkVOREVSRVIgPSAxMTtcbmV4cG9ydCBjb25zdCBTQU5JVElaRVIgPSAxMjtcbmV4cG9ydCBjb25zdCBUQUlMID0gMTM7XG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0lOREVYID0gMTQ7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9RVUVSSUVTID0gMTU7XG5cbi8qKlxuICogYExWaWV3RGF0YWAgc3RvcmVzIGFsbCBvZiB0aGUgaW5mb3JtYXRpb24gbmVlZGVkIHRvIHByb2Nlc3MgdGhlIGluc3RydWN0aW9ucyBhc1xuICogdGhleSBhcmUgaW52b2tlZCBmcm9tIHRoZSB0ZW1wbGF0ZS4gRWFjaCBlbWJlZGRlZCB2aWV3IGFuZCBjb21wb25lbnQgdmlldyBoYXMgaXRzXG4gKiBvd24gYExWaWV3RGF0YWAuIFdoZW4gcHJvY2Vzc2luZyBhIHBhcnRpY3VsYXIgdmlldywgd2Ugc2V0IHRoZSBgdmlld0RhdGFgIHRvIHRoYXRcbiAqIGBMVmlld0RhdGFgLiBXaGVuIHRoYXQgdmlldyBpcyBkb25lIHByb2Nlc3NpbmcsIHRoZSBgdmlld0RhdGFgIGlzIHNldCBiYWNrIHRvXG4gKiB3aGF0ZXZlciB0aGUgb3JpZ2luYWwgYHZpZXdEYXRhYCB3YXMgYmVmb3JlICh0aGUgcGFyZW50IGBMVmlld0RhdGFgKS5cbiAqXG4gKiBLZWVwaW5nIHNlcGFyYXRlIHN0YXRlIGZvciBlYWNoIHZpZXcgZmFjaWxpdGllcyB2aWV3IGluc2VydGlvbiAvIGRlbGV0aW9uLCBzbyB3ZVxuICogZG9uJ3QgaGF2ZSB0byBlZGl0IHRoZSBkYXRhIGFycmF5IGJhc2VkIG9uIHdoaWNoIHZpZXdzIGFyZSBwcmVzZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExWaWV3RGF0YSBleHRlbmRzIEFycmF5PGFueT4ge1xuICAvKipcbiAgICogVGhlIHN0YXRpYyBkYXRhIGZvciB0aGlzIHZpZXcuIFdlIG5lZWQgYSByZWZlcmVuY2UgdG8gdGhpcyBzbyB3ZSBjYW4gZWFzaWx5IHdhbGsgdXAgdGhlXG4gICAqIG5vZGUgdHJlZSBpbiBESSBhbmQgZ2V0IHRoZSBUVmlldy5kYXRhIGFycmF5IGFzc29jaWF0ZWQgd2l0aCBhIG5vZGUgKHdoZXJlIHRoZVxuICAgKiBkaXJlY3RpdmUgZGVmcyBhcmUgc3RvcmVkKS5cbiAgICovXG4gIFtUVklFV106IFRWaWV3O1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyZW50IHZpZXcgaXMgbmVlZGVkIHdoZW4gd2UgZXhpdCB0aGUgdmlldyBhbmQgbXVzdCByZXN0b3JlIHRoZSBwcmV2aW91c1xuICAgKiBgTFZpZXdEYXRhYC4gV2l0aG91dCB0aGlzLCB0aGUgcmVuZGVyIG1ldGhvZCB3b3VsZCBoYXZlIHRvIGtlZXAgYSBzdGFjayBvZlxuICAgKiB2aWV3cyBhcyBpdCBpcyByZWN1cnNpdmVseSByZW5kZXJpbmcgdGVtcGxhdGVzLlxuICAgKi9cbiAgW1BBUkVOVF06IExWaWV3RGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKlxuICAgKiBUaGUgbmV4dCBzaWJsaW5nIExWaWV3RGF0YSBvciBMQ29udGFpbmVyLlxuICAgKlxuICAgKiBBbGxvd3MgdXMgdG8gcHJvcGFnYXRlIGJldHdlZW4gc2libGluZyB2aWV3IHN0YXRlcyB0aGF0IGFyZW4ndCBpbiB0aGUgc2FtZVxuICAgKiBjb250YWluZXIuIEVtYmVkZGVkIHZpZXdzIGFscmVhZHkgaGF2ZSBhIG5vZGUubmV4dCwgYnV0IGl0IGlzIG9ubHkgc2V0IGZvclxuICAgKiB2aWV3cyBpbiB0aGUgc2FtZSBjb250YWluZXIuIFdlIG5lZWQgYSB3YXkgdG8gbGluayBjb21wb25lbnQgdmlld3MgYW5kIHZpZXdzXG4gICAqIGFjcm9zcyBjb250YWluZXJzIGFzIHdlbGwuXG4gICAqL1xuICBbTkVYVF06IExWaWV3RGF0YXxMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqIFF1ZXJpZXMgYWN0aXZlIGZvciB0aGlzIHZpZXcgLSBub2RlcyBmcm9tIGEgdmlldyBhcmUgcmVwb3J0ZWQgdG8gdGhvc2UgcXVlcmllcy4gKi9cbiAgW1FVRVJJRVNdOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKiBGbGFncyBmb3IgdGhpcyB2aWV3LiBTZWUgTFZpZXdGbGFncyBmb3IgbW9yZSBpbmZvLiAqL1xuICBbRkxBR1NdOiBMVmlld0ZsYWdzO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBgTFZpZXdOb2RlYCBvciBgTEVsZW1lbnROb2RlYCB3aGljaCByZXByZXNlbnRzIHRoZSByb290IG9mIHRoZSB2aWV3LlxuICAgKlxuICAgKiBJZiBgTFZpZXdOb2RlYCwgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIGEgY29udGFpbmVyLiBXZSBuZWVkIHRoaXMgdG8gYmUgYWJsZSB0b1xuICAgKiBlZmZpY2llbnRseSBmaW5kIHRoZSBgTFZpZXdOb2RlYCB3aGVuIGluc2VydGluZyB0aGUgdmlldyBpbnRvIGFuIGFuY2hvci5cbiAgICpcbiAgICogSWYgYExFbGVtZW50Tm9kZWAsIHRoaXMgaXMgdGhlIExWaWV3IG9mIGEgY29tcG9uZW50LlxuICAgKi9cbiAgLy8gVE9ETyhrYXJhKTogUmVwbGFjZSB3aXRoIGluZGV4XG4gIFtIT1NUX05PREVdOiBMVmlld05vZGV8TEVsZW1lbnROb2RlO1xuXG4gIC8qKlxuICAgKiBUaGUgYmluZGluZyBpbmRleCB3ZSBzaG91bGQgYWNjZXNzIG5leHQuXG4gICAqXG4gICAqIFRoaXMgaXMgc3RvcmVkIHNvIHRoYXQgYmluZGluZ3MgY2FuIGNvbnRpbnVlIHdoZXJlIHRoZXkgbGVmdCBvZmZcbiAgICogaWYgYSB2aWV3IGlzIGxlZnQgbWlkd2F5IHRocm91Z2ggcHJvY2Vzc2luZyBiaW5kaW5ncyAoZS5nLiBpZiB0aGVyZSBpc1xuICAgKiBhIHNldHRlciB0aGF0IGNyZWF0ZXMgYW4gZW1iZWRkZWQgdmlldywgbGlrZSBpbiBuZ0lmKS5cbiAgICovXG4gIFtCSU5ESU5HX0lOREVYXTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkaXJlY3RpdmUgaW5zdGFuY2VzIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqXG4gICAqIFRoZXNlIG11c3QgYmUgc3RvcmVkIHNlcGFyYXRlbHkgZnJvbSBMTm9kZXMgYmVjYXVzZSB0aGVpciBwcmVzZW5jZSBpc1xuICAgKiB1bmtub3duIGF0IGNvbXBpbGUtdGltZSBhbmQgdGh1cyBzcGFjZSBjYW5ub3QgYmUgcmVzZXJ2ZWQgaW4gZGF0YVtdLlxuICAgKi9cbiAgLy8gVE9ETzogZmxhdHRlbiBpbnRvIExWaWV3RGF0YVtdXG4gIFtESVJFQ1RJVkVTXTogYW55W118bnVsbDtcblxuICAvKipcbiAgICogV2hlbiBhIHZpZXcgaXMgZGVzdHJveWVkLCBsaXN0ZW5lcnMgbmVlZCB0byBiZSByZWxlYXNlZCBhbmQgb3V0cHV0cyBuZWVkIHRvIGJlXG4gICAqIHVuc3Vic2NyaWJlZC4gVGhpcyBjb250ZXh0IGFycmF5IHN0b3JlcyBib3RoIGxpc3RlbmVyIGZ1bmN0aW9ucyB3cmFwcGVkIHdpdGhcbiAgICogdGhlaXIgY29udGV4dCBhbmQgb3V0cHV0IHN1YnNjcmlwdGlvbiBpbnN0YW5jZXMgZm9yIGEgcGFydGljdWxhciB2aWV3LlxuICAgKlxuICAgKiBUaGVzZSBjaGFuZ2UgcGVyIExWaWV3IGluc3RhbmNlLCBzbyB0aGV5IGNhbm5vdCBiZSBzdG9yZWQgb24gVFZpZXcuIEluc3RlYWQsXG4gICAqIFRWaWV3LmNsZWFudXAgc2F2ZXMgYW4gaW5kZXggdG8gdGhlIG5lY2Vzc2FyeSBjb250ZXh0IGluIHRoaXMgYXJyYXkuXG4gICAqL1xuICAvLyBUT0RPOiBmbGF0dGVuIGludG8gTFZpZXdEYXRhW11cbiAgW0NMRUFOVVBdOiBhbnlbXXxudWxsO1xuXG4gIC8qKlxuICAgKiAtIEZvciBlbWJlZGRlZCB2aWV3cywgdGhlIGNvbnRleHQgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIHRlbXBsYXRlLlxuICAgKiAtIEZvciByb290IHZpZXcgb2YgdGhlIHJvb3QgY29tcG9uZW50IHRoZSBjb250ZXh0IGNvbnRhaW5zIGNoYW5nZSBkZXRlY3Rpb24gZGF0YS5cbiAgICogLSBgbnVsbGAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgW0NPTlRFWFRdOiB7fXxSb290Q29udGV4dHxudWxsO1xuXG4gIC8qKiBBbiBvcHRpb25hbCBNb2R1bGUgSW5qZWN0b3IgdG8gYmUgdXNlZCBhcyBmYWxsIGJhY2sgYWZ0ZXIgRWxlbWVudCBJbmplY3RvcnMgYXJlIGNvbnN1bHRlZC4gKi9cbiAgW0lOSkVDVE9SXTogSW5qZWN0b3J8bnVsbDtcblxuICAvKiogUmVuZGVyZXIgdG8gYmUgdXNlZCBmb3IgdGhpcyB2aWV3LiAqL1xuICBbUkVOREVSRVJdOiBSZW5kZXJlcjM7XG5cbiAgLyoqIEFuIG9wdGlvbmFsIGN1c3RvbSBzYW5pdGl6ZXIuICovXG4gIFtTQU5JVElaRVJdOiBTYW5pdGl6ZXJ8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGxhc3QgTFZpZXdEYXRhIG9yIExDb250YWluZXIgYmVuZWF0aCB0aGlzIExWaWV3RGF0YSBpbiB0aGUgaGllcmFyY2h5LlxuICAgKlxuICAgKiBUaGUgdGFpbCBhbGxvd3MgdXMgdG8gcXVpY2tseSBhZGQgYSBuZXcgc3RhdGUgdG8gdGhlIGVuZCBvZiB0aGUgdmlldyBsaXN0XG4gICAqIHdpdGhvdXQgaGF2aW5nIHRvIHByb3BhZ2F0ZSBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBjaGlsZC5cbiAgICovXG4gIC8vIFRPRE86IHJlcGxhY2Ugd2l0aCBnbG9iYWxcbiAgW1RBSUxdOiBMVmlld0RhdGF8TENvbnRhaW5lcnxudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIHBhcmVudCBjb250YWluZXIncyBob3N0IG5vZGUuIEFwcGxpY2FibGUgb25seSB0byBlbWJlZGRlZCB2aWV3cyB0aGF0XG4gICAqIGhhdmUgYmVlbiBpbnNlcnRlZCBkeW5hbWljYWxseS4gV2lsbCBiZSAtMSBmb3IgY29tcG9uZW50IHZpZXdzIGFuZCBpbmxpbmUgdmlld3MuXG4gICAqXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGp1bXAgZnJvbSBkeW5hbWljYWxseSBjcmVhdGVkIGVtYmVkZGVkIHZpZXdzIHRvIHRoZWlyIHBhcmVudFxuICAgKiBjb250YWluZXJzIGJlY2F1c2UgdGhlaXIgcGFyZW50IGNhbm5vdCBiZSBzdG9yZWQgb24gdGhlIFRWaWV3Tm9kZSAodmlld3MgbWF5IGJlIGluc2VydGVkXG4gICAqIGluIG11bHRpcGxlIGNvbnRhaW5lcnMsIHNvIHRoZSBwYXJlbnQgY2Fubm90IGJlIHNoYXJlZCBiZXR3ZWVuIHZpZXcgaW5zdGFuY2VzKS5cbiAgICovXG4gIFtDT05UQUlORVJfSU5ERVhdOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBRdWVyeUxpc3RzIGFzc29jaWF0ZWQgd2l0aCBjb250ZW50IHF1ZXJpZXMgb2YgYSBkaXJlY3RpdmUuIFRoaXMgZGF0YSBzdHJ1Y3R1cmUgaXNcbiAgICogZmlsbGVkLWluIGFzIHBhcnQgb2YgYSBkaXJlY3RpdmUgY3JlYXRpb24gcHJvY2VzcyBhbmQgaXMgbGF0ZXIgdXNlZCB0byByZXRyaWV2ZSBhIFF1ZXJ5TGlzdCB0b1xuICAgKiBiZSByZWZyZXNoZWQuXG4gICAqL1xuICBbQ09OVEVOVF9RVUVSSUVTXTogUXVlcnlMaXN0PGFueT5bXXxudWxsO1xufVxuXG4vKiogRmxhZ3MgYXNzb2NpYXRlZCB3aXRoIGFuIExWaWV3IChzYXZlZCBpbiBMVmlld0RhdGFbRkxBR1NdKSAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTFZpZXdGbGFncyB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdmlldyBpcyBpbiBjcmVhdGlvbk1vZGUuXG4gICAqXG4gICAqIFRoaXMgbXVzdCBiZSBzdG9yZWQgaW4gdGhlIHZpZXcgcmF0aGVyIHRoYW4gdXNpbmcgYGRhdGFgIGFzIGEgbWFya2VyIHNvIHRoYXRcbiAgICogd2UgY2FuIHByb3Blcmx5IHN1cHBvcnQgZW1iZWRkZWQgdmlld3MuIE90aGVyd2lzZSwgd2hlbiBleGl0aW5nIGEgY2hpbGQgdmlld1xuICAgKiBiYWNrIGludG8gdGhlIHBhcmVudCB2aWV3LCBgZGF0YWAgd2lsbCBiZSBkZWZpbmVkIGFuZCBgY3JlYXRpb25Nb2RlYCB3aWxsIGJlXG4gICAqIGltcHJvcGVybHkgcmVwb3J0ZWQgYXMgZmFsc2UuXG4gICAqL1xuICBDcmVhdGlvbk1vZGUgPSAwYjAwMDAwMSxcblxuICAvKiogV2hldGhlciB0aGlzIHZpZXcgaGFzIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneSAoY2hlY2tzIGFsd2F5cykgb3Igb25QdXNoICovXG4gIENoZWNrQWx3YXlzID0gMGIwMDAwMTAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgZGlydHkgKG5lZWRpbmcgY2hlY2spICovXG4gIERpcnR5ID0gMGIwMDAxMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgYXR0YWNoZWQgdG8gY2hhbmdlIGRldGVjdGlvbiB0cmVlLiAqL1xuICBBdHRhY2hlZCA9IDBiMDAxMDAwLFxuXG4gIC8qKlxuICAgKiAgV2hldGhlciBvciBub3QgdGhlIGluaXQgaG9va3MgaGF2ZSBydW4uXG4gICAqXG4gICAqIElmIG9uLCB0aGUgaW5pdCBob29rcyBoYXZlbid0IHlldCBiZWVuIHJ1biBhbmQgc2hvdWxkIGJlIGV4ZWN1dGVkIGJ5IHRoZSBmaXJzdCBjb21wb25lbnQgdGhhdFxuICAgKiBydW5zIE9SIHRoZSBmaXJzdCBjUigpIGluc3RydWN0aW9uIHRoYXQgcnVucyAoc28gaW5pdHMgYXJlIHJ1biBmb3IgdGhlIHRvcCBsZXZlbCB2aWV3IGJlZm9yZVxuICAgKiBhbnkgZW1iZWRkZWQgdmlld3MpLlxuICAgKi9cbiAgUnVuSW5pdCA9IDBiMDEwMDAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLiAqL1xuICBEZXN0cm95ZWQgPSAwYjEwMDAwMCxcbn1cblxuLyoqXG4gKiBUaGUgc3RhdGljIGRhdGEgZm9yIGFuIExWaWV3IChzaGFyZWQgYmV0d2VlbiBhbGwgdGVtcGxhdGVzIG9mIGFcbiAqIGdpdmVuIHR5cGUpLlxuICpcbiAqIFN0b3JlZCBvbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gYXMgbmdQcml2YXRlRGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUVmlldyB7XG4gIC8qKlxuICAgKiBJRCBmb3IgaW5saW5lIHZpZXdzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgdmlldyBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMgdmlld1xuICAgKiBpbiBhIGNlcnRhaW4gcG9zaXRpb24uIElmIGl0J3Mgbm90LCB3ZSBrbm93IHRoZSBuZXcgdmlldyBuZWVkcyB0byBiZSBpbnNlcnRlZFxuICAgKiBhbmQgdGhlIG9uZSB0aGF0IGV4aXN0cyBuZWVkcyB0byBiZSByZW1vdmVkIChlLmcuIGlmL2Vsc2Ugc3RhdGVtZW50cylcbiAgICpcbiAgICogSWYgdGhpcyBpcyAtMSwgdGhlbiB0aGlzIGlzIGEgY29tcG9uZW50IHZpZXcgb3IgYSBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXcuXG4gICAqL1xuICByZWFkb25seSBpZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZnVuY3Rpb24gdXNlZCB0byByZWZyZXNoIHRoZSB2aWV3IG9mIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3NcbiAgICogYW5kIGNvbXBvbmVudHMuIFdpbGwgYmUgbnVsbCBmb3IgaW5saW5lIHZpZXdzLlxuICAgKi9cbiAgdGVtcGxhdGU6IENvbXBvbmVudFRlbXBsYXRlPHt9PnxudWxsO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIGNvbnRhaW5pbmcgcXVlcnktcmVsYXRlZCBpbnN0cnVjdGlvbnMuXG4gICAqL1xuICB2aWV3UXVlcnk6IENvbXBvbmVudFF1ZXJ5PHt9PnxudWxsO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBgVE5vZGVgIHRoYXQgcmVwcmVzZW50cyB0aGUgcm9vdCBvZiB0aGUgdmlldy5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhIGBUTm9kZWAgZm9yIGFuIGBMVmlld05vZGVgLCB0aGlzIGlzIGFuIGVtYmVkZGVkIHZpZXcgb2YgYSBjb250YWluZXIuXG4gICAqIFdlIG5lZWQgdGhpcyBwb2ludGVyIHRvIGJlIGFibGUgdG8gZWZmaWNpZW50bHkgZmluZCB0aGlzIG5vZGUgd2hlbiBpbnNlcnRpbmcgdGhlIHZpZXdcbiAgICogaW50byBhbiBhbmNob3IuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBgVE5vZGVgIGZvciBhbiBgTEVsZW1lbnROb2RlYCwgdGhpcyBpcyB0aGUgVFZpZXcgb2YgYSBjb21wb25lbnQuXG4gICAqL1xuICBub2RlOiBUTm9kZTtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB0ZW1wbGF0ZSBoYXMgYmVlbiBwcm9jZXNzZWQuICovXG4gIGZpcnN0VGVtcGxhdGVQYXNzOiBib29sZWFuO1xuXG4gIC8qKiBTdGF0aWMgZGF0YSBlcXVpdmFsZW50IG9mIExWaWV3LmRhdGFbXS4gQ29udGFpbnMgVE5vZGVzLiAqL1xuICBkYXRhOiBURGF0YTtcblxuICAvKipcbiAgICogVGhlIGJpbmRpbmcgc3RhcnQgaW5kZXggaXMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBkYXRhIGFycmF5XG4gICAqIHN0YXJ0cyB0byBzdG9yZSBiaW5kaW5ncyBvbmx5LiBTYXZpbmcgdGhpcyB2YWx1ZSBlbnN1cmVzIHRoYXQgd2VcbiAgICogd2lsbCBiZWdpbiByZWFkaW5nIGJpbmRpbmdzIGF0IHRoZSBjb3JyZWN0IHBvaW50IGluIHRoZSBhcnJheSB3aGVuXG4gICAqIHdlIGFyZSBpbiB1cGRhdGUgbW9kZS5cbiAgICovXG4gIGJpbmRpbmdTdGFydEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBob3N0IG5vZGUgb2YgdGhlIGZpcnN0IExWaWV3IG9yIExDb250YWluZXIgYmVuZWF0aCB0aGlzIExWaWV3IGluXG4gICAqIHRoZSBoaWVyYXJjaHkuXG4gICAqXG4gICAqIE5lY2Vzc2FyeSB0byBzdG9yZSB0aGlzIHNvIHZpZXdzIGNhbiB0cmF2ZXJzZSB0aHJvdWdoIHRoZWlyIG5lc3RlZCB2aWV3c1xuICAgKiB0byByZW1vdmUgbGlzdGVuZXJzIGFuZCBjYWxsIG9uRGVzdHJveSBjYWxsYmFja3MuXG4gICAqXG4gICAqIEZvciBlbWJlZGRlZCB2aWV3cywgd2Ugc3RvcmUgdGhlIGluZGV4IG9mIGFuIExDb250YWluZXIncyBob3N0IHJhdGhlciB0aGFuIHRoZSBmaXJzdFxuICAgKiBMVmlldyB0byBhdm9pZCBtYW5hZ2luZyBzcGxpY2luZyB3aGVuIHZpZXdzIGFyZSBhZGRlZC9yZW1vdmVkLlxuICAgKi9cbiAgY2hpbGRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTZWxlY3RvciBtYXRjaGVzIGZvciBhIG5vZGUgYXJlIHRlbXBvcmFyaWx5IGNhY2hlZCBvbiB0aGUgVFZpZXcgc28gdGhlXG4gICAqIERJIHN5c3RlbSBjYW4gZWFnZXJseSBpbnN0YW50aWF0ZSBkaXJlY3RpdmVzIG9uIHRoZSBzYW1lIG5vZGUgaWYgdGhleSBhcmVcbiAgICogY3JlYXRlZCBvdXQgb2Ygb3JkZXIuIFRoZXkgYXJlIG92ZXJ3cml0dGVuIGFmdGVyIGVhY2ggbm9kZS5cbiAgICpcbiAgICogPGRpdiBkaXJBIGRpckI+PC9kaXY+XG4gICAqXG4gICAqIGUuZy4gRGlyQSBpbmplY3RzIERpckIsIGJ1dCBEaXJBIGlzIGNyZWF0ZWQgZmlyc3QuIERJIHNob3VsZCBpbnN0YW50aWF0ZVxuICAgKiBEaXJCIHdoZW4gaXQgZmluZHMgdGhhdCBpdCdzIG9uIHRoZSBzYW1lIG5vZGUsIGJ1dCBub3QgeWV0IGNyZWF0ZWQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGRlZnNcbiAgICogT2RkIGluZGljZXM6XG4gICAqICAgLSBOdWxsIGlmIHRoZSBhc3NvY2lhdGVkIGRpcmVjdGl2ZSBoYXNuJ3QgYmVlbiBpbnN0YW50aWF0ZWQgeWV0XG4gICAqICAgLSBEaXJlY3RpdmUgaW5kZXgsIGlmIGFzc29jaWF0ZWQgZGlyZWN0aXZlIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICogICAtIFN0cmluZywgdGVtcG9yYXJ5ICdDSVJDVUxBUicgdG9rZW4gc2V0IHdoaWxlIGRlcGVuZGVuY2llcyBhcmUgYmVpbmcgcmVzb2x2ZWRcbiAgICovXG4gIGN1cnJlbnRNYXRjaGVzOiBDdXJyZW50TWF0Y2hlc0xpc3R8bnVsbDtcblxuICAvKipcbiAgICogRGlyZWN0aXZlIGFuZCBjb21wb25lbnQgZGVmcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIG1hdGNoZWQgdG8gbm9kZXMgb25cbiAgICogdGhpcyB2aWV3LlxuICAgKlxuICAgKiBEZWZzIGFyZSBzdG9yZWQgYXQgdGhlIHNhbWUgaW5kZXggaW4gVFZpZXcuZGlyZWN0aXZlc1tdIGFzIHRoZWlyIGluc3RhbmNlc1xuICAgKiBhcmUgc3RvcmVkIGluIExWaWV3LmRpcmVjdGl2ZXNbXS4gVGhpcyBzaW1wbGlmaWVzIGxvb2t1cCBpbiBESS5cbiAgICovXG4gIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZURlZkxpc3R8bnVsbDtcblxuICAvKipcbiAgICogRnVsbCByZWdpc3RyeSBvZiBkaXJlY3RpdmVzIGFuZCBjb21wb25lbnRzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBkaXJlY3RpdmVSZWdpc3RyeTogRGlyZWN0aXZlRGVmTGlzdHxudWxsO1xuXG4gIC8qKlxuICAgKiBGdWxsIHJlZ2lzdHJ5IG9mIHBpcGVzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIGVpdGhlciBhbiBhcnJheSBvZiBgUGlwZURlZnNgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBQaXBlRGVmc2BzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBwaXBlUmVnaXN0cnk6IFBpcGVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25Jbml0IGFuZCBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpblxuICAgKiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgaW5pdEhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpbiB1cGRhdGUgbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJDb250ZW50SW5pdCBhbmQgbmdBZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkXG4gICAqIGZvciB0aGlzIHZpZXcgaW4gY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnRlbnRIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW4gdXBkYXRlXG4gICAqIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBjb250ZW50Q2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlclZpZXdJbml0IGFuZCBuZ0FmdGVyVmlld0NoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yXG4gICAqIHRoaXMgdmlldyBpbiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgdmlld0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyVmlld0NoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpblxuICAgKiB1cGRhdGUgbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHZpZXdDaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ09uRGVzdHJveSBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCB3aGVuIHRoaXMgdmlldyBpcyBkZXN0cm95ZWQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBkZXN0cm95SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHBpcGUgbmdPbkRlc3Ryb3kgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IEluZGV4IG9mIHBpcGUgaW4gZGF0YVxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKlxuICAgKiBUaGVzZSBtdXN0IGJlIHN0b3JlZCBzZXBhcmF0ZWx5IGZyb20gZGlyZWN0aXZlIGRlc3Ryb3kgaG9va3MgYmVjYXVzZSB0aGVpciBjb250ZXh0c1xuICAgKiBhcmUgc3RvcmVkIGluIGRhdGEuXG4gICAqL1xuICBwaXBlRGVzdHJveUhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNsZWFudXAgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZGF0YSAoaW4gY2h1bmtzIG9mIDQpXG4gICAqIGFuZCBvdXRwdXQgZGF0YSAoaW4gY2h1bmtzIG9mIDIpIGZvciBhIHBhcnRpY3VsYXIgdmlldy4gQ29tYmluaW5nIHRoZSBhcnJheXNcbiAgICogc2F2ZXMgb24gbWVtb3J5ICg3MCBieXRlcyBwZXIgYXJyYXkpIGFuZCBvbiBhIGZldyBieXRlcyBvZiBjb2RlIHNpemUgKGZvciB0d29cbiAgICogc2VwYXJhdGUgZm9yIGxvb3BzKS5cbiAgICpcbiAgICogSWYgaXQncyBhIG5hdGl2ZSBET00gbGlzdGVuZXIgYmVpbmcgc3RvcmVkOlxuICAgKiAxc3QgaW5kZXggaXM6IGV2ZW50IG5hbWUgdG8gcmVtb3ZlXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgbmF0aXZlIGVsZW1lbnQgaW4gTFZpZXcuZGF0YVtdXG4gICAqIDNyZCBpbmRleCBpczogaW5kZXggb2Ygd3JhcHBlZCBsaXN0ZW5lciBmdW5jdGlvbiBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICogNHRoIGluZGV4IGlzOiB1c2VDYXB0dXJlIGJvb2xlYW5cbiAgICpcbiAgICogSWYgaXQncyBhIHJlbmRlcmVyMiBzdHlsZSBsaXN0ZW5lciBvciBWaWV3UmVmIGRlc3Ryb3kgaG9vayBiZWluZyBzdG9yZWQ6XG4gICAqIDFzdCBpbmRleCBpczogaW5kZXggb2YgdGhlIGNsZWFudXAgZnVuY3Rpb24gaW4gTFZpZXcuY2xlYW51cEluc3RhbmNlc1tdXG4gICAqIDJuZCBpbmRleCBpczogbnVsbFxuICAgKlxuICAgKiBJZiBpdCdzIGFuIG91dHB1dCBzdWJzY3JpcHRpb24gb3IgcXVlcnkgbGlzdCBkZXN0cm95IGhvb2s6XG4gICAqIDFzdCBpbmRleCBpczogb3V0cHV0IHVuc3Vic2NyaWJlIGZ1bmN0aW9uIC8gcXVlcnkgbGlzdCBkZXN0cm95IGZ1bmN0aW9uXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgZnVuY3Rpb24gY29udGV4dCBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICovXG4gIGNsZWFudXA6IGFueVtdfG51bGw7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBkaXJlY3RpdmUgYW5kIGVsZW1lbnQgaW5kaWNlcyBmb3IgY2hpbGQgY29tcG9uZW50cyB0aGF0IHdpbGwgbmVlZCB0byBiZVxuICAgKiByZWZyZXNoZWQgd2hlbiB0aGUgY3VycmVudCB2aWV3IGhhcyBmaW5pc2hlZCBpdHMgY2hlY2suXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGljZXNcbiAgICogT2RkIGluZGljZXM6IEVsZW1lbnQgaW5kaWNlcyAoYWRqdXN0ZWQgZm9yIExWaWV3RGF0YSBoZWFkZXIgb2Zmc2V0KVxuICAgKi9cbiAgY29tcG9uZW50czogbnVtYmVyW118bnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGluZGljZXMgZm9yIGNoaWxkIGRpcmVjdGl2ZXMgdGhhdCBoYXZlIGhvc3QgYmluZGluZ3MuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGljZXNcbiAgICogT2RkIGluZGljZXM6IEVsZW1lbnQgaW5kaWNlc1xuICAgKlxuICAgKiBFbGVtZW50IGluZGljZXMgYXJlIE5PVCBhZGp1c3RlZCBmb3IgTFZpZXdEYXRhIGhlYWRlciBvZmZzZXQgYmVjYXVzZVxuICAgKiB0aGV5IHdpbGwgYmUgZmVkIGludG8gaW5zdHJ1Y3Rpb25zIHRoYXQgZXhwZWN0IHRoZSByYXcgaW5kZXggKGUuZy4gZWxlbWVudFByb3BlcnR5KVxuICAgKi9cbiAgaG9zdEJpbmRpbmdzOiBudW1iZXJbXXxudWxsO1xuXG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBpbmRpY2VzIGZvciBjaGlsZCBkaXJlY3RpdmVzIHRoYXQgaGF2ZSBjb250ZW50IHF1ZXJpZXMuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGljZXNcbiAgICogT2RkIGluZGljZXM6IFN0YXJ0aW5nIGluZGV4IG9mIGNvbnRlbnQgcXVlcmllcyAoc3RvcmVkIGluIENPTlRFTlRfUVVFUklFUykgZm9yIHRoaXMgZGlyZWN0aXZlXG4gICAqL1xuICBjb250ZW50UXVlcmllczogbnVtYmVyW118bnVsbDtcbn1cblxuLyoqXG4gKiBSb290Q29udGV4dCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBpcyBzaGFyZWQgZm9yIGFsbCBjb21wb25lbnRzIHdoaWNoXG4gKiB3ZXJlIGJvb3RzdHJhcHBlZCB3aXRoIHtAbGluayByZW5kZXJDb21wb25lbnR9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RDb250ZXh0IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdXNlZCBmb3Igc2NoZWR1bGluZyBjaGFuZ2UgZGV0ZWN0aW9uIGluIHRoZSBmdXR1cmUuIFVzdWFsbHlcbiAgICogdGhpcyBpcyBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICovXG4gIHNjaGVkdWxlcjogKHdvcmtGbjogKCkgPT4gdm9pZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdoZW4gYWxsIGNvbXBvbmVudHMgYXJlIGNvbnNpZGVyZWQgY2xlYW4gKG5vdCBkaXJ0eSkuXG4gICAqXG4gICAqIFRoaXMgcHJvbWlzZSBpcyBvdmVyd3JpdHRlbiBldmVyeSB0aW1lIGEgZmlyc3QgY2FsbCB0byB7QGxpbmsgbWFya0RpcnR5fSBpcyBpbnZva2VkLlxuICAgKi9cbiAgY2xlYW46IFByb21pc2U8bnVsbD47XG5cbiAgLyoqXG4gICAqIFJvb3RDb21wb25lbnRzIC0gVGhlIGNvbXBvbmVudHMgdGhhdCB3ZXJlIGluc3RhbnRpYXRlZCBieSB0aGUgY2FsbCB0b1xuICAgKiB7QGxpbmsgcmVuZGVyQ29tcG9uZW50fS5cbiAgICovXG4gIGNvbXBvbmVudHM6IHt9W107XG59XG5cbi8qKlxuICogQXJyYXkgb2YgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIGEgdmlldyBhbmQgdGhlaXIgZGlyZWN0aXZlIGluZGljZXMuXG4gKlxuICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEhvb2tEYXRhID0gKG51bWJlciB8ICgoKSA9PiB2b2lkKSlbXTtcblxuLyoqXG4gKiBTdGF0aWMgZGF0YSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpbnN0YW5jZS1zcGVjaWZpYyBkYXRhIGFycmF5IG9uIGFuIExWaWV3LlxuICpcbiAqIEVhY2ggbm9kZSdzIHN0YXRpYyBkYXRhIGlzIHN0b3JlZCBpbiB0RGF0YSBhdCB0aGUgc2FtZSBpbmRleCB0aGF0IGl0J3Mgc3RvcmVkXG4gKiBpbiB0aGUgZGF0YSBhcnJheS4gRWFjaCBwaXBlJ3MgZGVmaW5pdGlvbiBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleFxuICogYXMgaXRzIHBpcGUgaW5zdGFuY2UgaW4gdGhlIGRhdGEgYXJyYXkuIEFueSBub2RlcyB0aGF0IGRvIG5vdCBoYXZlIHN0YXRpY1xuICogZGF0YSBzdG9yZSBhIG51bGwgdmFsdWUgaW4gdERhdGEgdG8gYXZvaWQgYSBzcGFyc2UgYXJyYXkuXG4gKi9cbmV4cG9ydCB0eXBlIFREYXRhID0gKFROb2RlIHwgUGlwZURlZkludGVybmFsPGFueT58IG51bGwpW107XG5cbi8qKiBUeXBlIGZvciBUVmlldy5jdXJyZW50TWF0Y2hlcyAqL1xuZXhwb3J0IHR5cGUgQ3VycmVudE1hdGNoZXNMaXN0ID0gW0RpcmVjdGl2ZURlZkludGVybmFsPGFueT4sIChzdHJpbmcgfCBudW1iZXIgfCBudWxsKV07XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=