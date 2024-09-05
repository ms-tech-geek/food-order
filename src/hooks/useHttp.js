import { useEffect, useState } from "react";

const sendHttpRequest = async ({ url, config }) => {
	const response = await fetch(url, config);
	const respData = response.json();

	if (!response.ok) {
		throw new Error(
			respData.message || `Something went wrong, failed to send http request.`
		);
	}
};

const useHttp = ({ url, config }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(async () => {
		setIsLoading(true);
		try {
			const respData = await sendHttpRequest({ url, config });
			setData(respData);
		} catch (error) {
			setError(error.message || `Something went wrong!`);
		}
		setIsLoading(false);
	}, [url, config]);

	useEffect(() => {
		if (config && config.method === "GET") sendRequest();
	}, [sendRequest, config]);

	return {
		data,
		isLoading,
		error,
        sendRequest
	};
};

export default useHttp;
