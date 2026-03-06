const NotFound = () => {
    return (
        <div className="bg-black text-white h-screen">
            <h1>404 Not Found</h1>
            <br />
            <button
                className="bg-blue-600 ml-3 hover:bg-blue-700 active:bg-blue-800 p-2"
                onClick={() => globalThis.history.back()}
            >
                Go Back
            </button>
        </div>
    );
};

export default NotFound;