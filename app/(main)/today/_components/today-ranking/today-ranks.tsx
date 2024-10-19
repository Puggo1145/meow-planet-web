// components
import TodayRanksItem from "./today-ranks-item"
// mock
import { todayRanksMock } from "@/mock/cat-rank-mock"

const TodayRanks = () => {
    return (
        <section className="flex flex-col gap-y-2">
            <header className="py-6">
                <h1 className="text-2xl font-black">Ranks</h1>
            </header>
            
            <ul className="flex flex-col">
                {todayRanksMock.map((rank) => (
                    <TodayRanksItem
                        key={rank.id}
                        {...rank}
                    />
                ))}
            </ul>
        </section>
    )
}

export default TodayRanks