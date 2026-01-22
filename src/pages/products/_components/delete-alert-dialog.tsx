import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useCategoryAction from "@/hooks/product/category/use-category-action";
import type {
  CategoryFormAction,
  CategoryFormState,
} from "@/reducers/products/category.reducer";
import type { Dispatch } from "react";

export default function DeleteAlertDialog({
  state,
  dispatch,
}: {
  state: CategoryFormState;
  dispatch: Dispatch<CategoryFormAction>;
}) {
  const { handleDeleteCategory } = useCategoryAction();

  return (
    <AlertDialog
      open={state.alert_dialog_open}
      onOpenChange={(value) => {
        if (!value) {
          dispatch({
            type: "UPDATE_FEILD",
            field: "id",
            value: undefined,
          });
        }
        dispatch({
          type: "UPDATE_FEILD",
          field: "alert_dialog_open",
          value,
        });
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteCategory(state.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
