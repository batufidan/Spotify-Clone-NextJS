import { useEffect } from "react";
import { SignIn, useSession } from "typescript";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshedAccessTokenError') {
                SignIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}


export default useSpotify;