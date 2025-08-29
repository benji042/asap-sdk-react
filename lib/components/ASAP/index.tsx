import AppKitProvider from "../../providers/AppKitProvider"
import PaymentModal from "../PaymentModal"
import '../../index.css'

export const ASAP = () => {
    return (
        <AppKitProvider>
            <PaymentModal />
        </AppKitProvider>
    )
}