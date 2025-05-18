
function RightColGrid({children}: {children: React.ReactNode}) {
    return (
        <section
            className="md:col-start-6 md:col-end-13 col-start-1  col-end-13 rounded-tl-2xl rounded-bl-2xl overflow-hidden">
            {children}
            </section>
    )
}

export default RightColGrid
