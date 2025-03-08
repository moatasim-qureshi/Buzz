"use client";

import clsx from "clsx";

import useCoversation from "../hooks/useConversation";
import EmptyState from "../components/emptystate";

const Home = () => {
    const {isOpen} = useCoversation();

    return (
        <div
        className={clsx(
            "lg:pl-80 h-full lg:black",
            isOpen ? 'black' : 'hidden'
        )}
        >
            <EmptyState/>
        </div>
    )
}

export default Home;