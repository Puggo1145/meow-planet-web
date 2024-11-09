"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useUserStore } from "@/store/use-user"
import { useFeedsStore } from "@/store/use-feeds-store"
// ui
import {
    CatCard,
    CatCardImage,
    CatCardInfo,
    CatCardInfoName,
    CatCardInfoNumbers,
    CatCardInfoLikeCount,
    CatCardInfoLoveCount,
    CatCardImageUpdates,
} from "@/app/(main)/_components/cat-card"
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
// components
import Link from "next/link"
import { ListEnd } from "@/components/list-end"
import { EmptyStatus } from "@/components/status/empty-status"
// services
import { getRecentCats } from "@/services/cats"

interface Cat {
  $id: string;
  name: string;
  avatarUrl: string;
  likes: number;
  lovedCount: number;
  recentImageCount: number;
}

const FeedsList = () => {
    const { currentFeed } = useFeedsStore();
    const { user } = useUserStore();
    
    const [cats, setCats] = useState<Cat[]>([]);
    const [lastId, setLastId] = useState<string>();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const { ref, inView } = useInView();

    const loadCats = async (cursor?: string) => {
        if (loading) return;
        setLoading(true);
        try {
            if (currentFeed === "loved" && user?.prefs?.lovedCats) {
                const lovedCatIds = user.prefs.lovedCats;
                const startIndex = cursor ? lovedCatIds.indexOf(cursor) + 1 : 0;
                const endIndex = startIndex + 10;
                const currentPageIds = lovedCatIds.slice(startIndex, endIndex);

                if (currentPageIds.length > 0) {
                    const response = await getRecentCats({ 
                        catIds: currentPageIds,
                        limit: 10 
                    });
                    setCats(prev => cursor ? [...prev, ...response.cats] : response.cats);
                    setHasMore(endIndex < lovedCatIds.length);
                    setLastId(currentPageIds[currentPageIds.length - 1]);
                } else {
                    setHasMore(false);
                }
            } else {
                const response = await getRecentCats({ cursor });
                setCats(prev => cursor ? [...prev, ...response.cats] : response.cats);
                setHasMore(response.hasMore);
                setLastId(response.lastId);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        setCats([]);
        setLastId(undefined);
        setHasMore(true);
        setInitialLoading(true);
        loadCats();
    }, [currentFeed, user?.prefs?.lovedCats]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            loadCats(lastId);
        }
    }, [inView, hasMore, loading, lastId]);

    if (initialLoading) {
        return (
            <ScrollArea className="mt-4 w-full flex-1">
                <ul className="w-full grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-[320px]" />
                    ))}
                </ul>
            </ScrollArea>
        );
    }

    if (!initialLoading && cats.length === 0) {
        return (
            <EmptyStatus 
                title={currentFeed === "loved" ? "还没有喜欢的猫咪" : "猫咪都躲起来了"} 
                description={currentFeed === "loved" ? "去发现更多猫咪吧" : "暂无更多猫咪"} 
            />
        );
    }

    return (
        <ScrollArea className="mt-4 w-full flex-1">
            <ul className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((cat) => (
                    <Link href={`/cats/${cat.$id}`} key={cat.$id}>
                        <CatCard>
                            <CatCardImage src={cat.avatarUrl} />
                            <CatCardInfo>
                                <CatCardInfoName>{cat.name}</CatCardInfoName>
                                <CatCardImageUpdates>
                                    {`最近新增 ${cat.recentImageCount} 张图片`}
                                </CatCardImageUpdates>
                                <CatCardInfoNumbers>
                                    <CatCardInfoLikeCount likeCount={cat.likes} />
                                    <CatCardInfoLoveCount loveCount={cat.lovedCount} />
                                </CatCardInfoNumbers>
                            </CatCardInfo>
                        </CatCard>
                    </Link>
                ))}
            </ul>
            <div ref={ref} className="h-4" />
            {!hasMore && <ListEnd />}
            <ScrollBar className="opacity-50" />
        </ScrollArea>
    );
};

export default FeedsList;
