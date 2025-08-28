import AppKitProvider from "../../providers/AppKitProvider"
import PaymentModal from "../PaymentModal"
import '../../index.css'

export const ASAPModal = () => {
    return (
        <AppKitProvider>
            <PaymentModal />
        </AppKitProvider>
    )
}