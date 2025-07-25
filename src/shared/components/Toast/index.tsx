import { Bounce, ToastContainer, ToastContainerProps } from 'react-toastify';

const Toast = (props: ToastContainerProps) => (
    <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        {...props}
    />
);

export default Toast;
