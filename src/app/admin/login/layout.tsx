const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-svh md:py-[3vh] py-10 flex items-center justify-center">
            {children}
        </div>
    )
}

export default layout