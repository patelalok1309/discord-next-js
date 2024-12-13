"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<any>(null);
    // const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(
            process.env.NEXT_PUBLIC_SITE_URL!,
            {
                path: "/api/socket/io",
                addTrailingSlash: false,
            }
        );

        socketInstance.on("connect", () => {
            setIsConnected(true);
        });
        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        // setSocket(socketInstance);
        socketRef.current = socketInstance;

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{ socket: socketRef.current, isConnected }}
        >
            {children}
        </SocketContext.Provider>
    );
};
