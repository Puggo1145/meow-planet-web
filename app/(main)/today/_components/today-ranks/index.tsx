// components
import { TodayRanksHeader } from "./today-ranks-header"
import { TodayRanksItem } from "./today-ranks-item"
// mock
import { todayRanksMock } from "@/mock/cat-rank-mock"

const TodayRanks = () => {
    return (
        <section className="flex flex-col gap-y-2">
            <TodayRanksHeader />
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