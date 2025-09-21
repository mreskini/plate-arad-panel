/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
import clsx from "clsx"
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-reactjs"
import { ToastContainer } from "react-toastify"

export const Toast = () => {
    return (
        // Update toast colors with theme values
        <ToastContainer
            position="bottom-left"
            rtl
            closeButton={false}
            closeOnClick
            pauseOnFocusLoss={false}
            toastClassName={context =>
                clsx([
                    "mt-4 flex flex-row items-center p-4 rounded-lg",
                    context?.type === "error" && "bg-toast-container-error-bg text-toast-container-error-text",
                    context?.type === "success" && "bg-toast-container-success-bg text-toast-container-success-text",
                    context?.type === "warning" && "bg-toast-container-warning-bg text-toast-container-warning-text",
                    context?.type === "info" && "bg-toast-container-info-bg text-toast-container-info-text",
                ])
            }
            icon={({ type }) => {
                if (type === "success") return <TickCircle variant="Bold" />
                if (type === "error") return <CloseCircle variant="Bold" />
                if (type === "warning") return <Danger variant="Bold" />
                if (type === "info") return <InfoCircle variant="Bold" />
            }}
        />
    )
}
