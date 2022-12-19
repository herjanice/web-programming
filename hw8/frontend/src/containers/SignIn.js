import { useChat } from '../containers/hooks/useChat.js'
import LogIn from '../components/Login.js'
import AppTitle from '../components/Title.js'

const SignIn = ({me}) => {

    const { setMe, setSignedIn, displayStatus } = useChat();
    
    const handleLogin = (name) => {
        if(!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }
    
    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn