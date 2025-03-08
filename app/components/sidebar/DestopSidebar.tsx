'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingModal from "./SettingModal";

interface DesktopSidebarProps{
    currentUser: User
}

const DesktopSidebar: React.FC <DesktopSidebarProps>= ({
    currentUser
}) => {
    const routes = useRoutes();
    const [isOpen,setIsOpen] = useState(false);
    console.log({currentUser})
    
    return (
        <>
        <SettingModal
            currentUser= {currentUser}
            isOpen={isOpen}
            onClose={()=> setIsOpen(false)}
        />
            <div className="
                hidden
                lg:fixed
                lg:inset-y-0
                lg:left-0
                lg:z-40
                lg:w-20
                xl:px-6
                lg:overflow-y-auto
                lg:bg-white
                lg:border-r-[1px]
                lg:pb-4
                lg:flex
                lg:flex-col
                justify-between


            ">
                <nav className="mt-4 flex flex-col justify-between">
                    <ul role="list" className="flex flex-col items-center space-y-1">
                        {routes.map((item) => (
                            <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}

                            />
                        ))}
                    </ul>
                </nav>

                <nav className="
                    mt-4
                    flex
                    flex-col
                    justify-between
                    items-center
                ">
                    <div onClick={() => setIsOpen(true)}
                        className="
                            cursor-pointer
                            hover:opacity-75
                            transition
                            ">
                        <Avatar user={currentUser}/>

                    </div>

                </nav>


            </div>
        </>
    )
    
}

export default DesktopSidebar;






// 'use client';

// import useRoutes from "@/app/hooks/useRoutes";
// import { useState } from "react";
// import DesktopItem from "./DesktopItem";
// import { User } from "@prisma/client";
// import Avatar from "../Avatar";
// import Image from "next/image";

// interface DesktopSidebarProps {
//     currentUser: User;
// }

// const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
//     const routes = useRoutes();
//     const [isOpen, setIsOpen] = useState(false);

//     const handleClose = () => setIsOpen(false);

//     return (
//         <>
//             {/* Sidebar */}
//             <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
//                 <nav className="mt-4 flex flex-col justify-between">
//                     <ul role="list" className="flex flex-col items-center space-y-1">
//                         {routes.map((item) => (
//                             <DesktopItem
//                                 key={item.label}
//                                 href={item.href}
//                                 label={item.label}
//                                 icon={item.icon}
//                                 active={item.active}
//                                 onClick={item.onClick}
//                             />
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* Avatar with Clickable Modal */}
//                 <nav className="mt-4 flex flex-col justify-between items-center">
//                     <div
//                         onClick={() => setIsOpen(true)}
//                         className="cursor-pointer hover:opacity-75 transition"
//                     >
//                         <Avatar user={currentUser} />
//                     </div>
//                 </nav>
//             </div>

//             {/* Full-screen Avatar Modal */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
//                     onClick={handleClose}
//                 >
//                     <div
//                         className="bg-white p-4 rounded-lg shadow-lg transition-transform transform scale-100 animate-zoomIn"
//                         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
//                     >
//                         <Image
//                             src={currentUser?.image || '/images/Portrait_Placeholder.png'}
//                             alt="Profile Picture"
//                             width={300}
//                             height={300}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 </div>
//             )}

//             {/* Tailwind Animations */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
//                 @keyframes zoomIn {
//                     from { transform: scale(0.8); opacity: 0; }
//                     to { transform: scale(1); opacity: 1; }
//                 }
//                 .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//                 .animate-zoomIn { animation: zoomIn 0.3s ease-out; }
//             `}</style>
//         </>
//     );
// }

// export default DesktopSidebar;
