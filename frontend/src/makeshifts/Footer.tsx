function Footer({ isCenter = true }) {
    return (
        <>
            {
                isCenter ? (
                    <p className="mt-8 text-gray-500 text-sm text-center">
                        {import.meta.env.VITE_ADMIN_PANEL_NAME} v{import.meta.env.VITE_ADMIN_PANEL_VERSION}
                    </p>
                ) : (
                    <p className="mt-8 text-gray-500 text-sm">
                        {import.meta.env.VITE_ADMIN_PANEL_NAME} v{import.meta.env.VITE_ADMIN_PANEL_VERSION}
                    </p>
                )
            }
        </>
    )
}

export default Footer;