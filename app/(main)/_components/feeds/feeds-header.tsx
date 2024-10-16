import { Button } from "@/components/ui/button"

const FeedsHeader = () => {
    const mockFeedsNavs = [
        "Trending",
        "For You",
        "Friends",
    ]

    return (
        <div className="flex justify-between py-6">
            <h1 className="text-2xl font-black">Feeds</h1>
            <div className="flex">
                {mockFeedsNavs.map((nav, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        {nav}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default FeedsHeader