import './index.css'
import Button, { AsapButtonProps } from './components/AsapButton';
import { AppKitProvider } from './components/Provider';

export const AsapButton = (props: AsapButtonProps) => {
    return (
        <>
            <AppKitProvider>
                <Button {...props} />
            </AppKitProvider>
        </>
    )
};