import { FormGroup, AbstractControl } from "@angular/forms";

/**
 * @description Used to get AbstractControl to check behaviour of elements such as (HTML) input elements
 * @param formGroup
 * @param formControllerName
 * @returns AbstractControl | null
 */
export function getAbstractController(formGroup: FormGroup, formControllerName: string): AbstractControl | null {
    return formGroup.get(formControllerName);
}