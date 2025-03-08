
import getConversation from "../actions/getConversation";
import SideBar from "../components/sidebar/Sidebar";
import ConverstaionList from "./components/conversationLists";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversation();
    return(
        <SideBar>
            <div className="h-full">
                <ConverstaionList
                    initialItems={conversations}
                />
                {children}
            </div>

        </SideBar>
    )
}