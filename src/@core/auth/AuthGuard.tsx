import { useRouter } from 'next/router';
// ** React Imports
import { useEffect } from 'react';

// ** Next Import

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth';

const AuthGuard = (props: any) => {
	const { children, fallback } = props;
	const auth = useAuth();
	const router = useRouter();

	useEffect(
		() => {
			if (!router.isReady) {
				return;
			}
			if (!auth.loading && auth.user === null && !auth.isLoggedIn) {
				if (router.asPath !== '/') {
					router.replace({
						pathname: '/login',
						query: { returnUrl: router.asPath },
					});
				} else {
					router.replace('/login');
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.route],
	);

	if (auth.loading || !auth.isLoggedIn) {
		return fallback;
	}

	return <>{children}</>;
};

export default AuthGuard;
