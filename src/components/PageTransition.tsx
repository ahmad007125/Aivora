// "use client";

// import { ReactNode } from "react";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";

// type PageTransitionProps = {
//   children: ReactNode;
// };

// export default function PageTransition({ children }: PageTransitionProps) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.div
//         key={pathname}
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -8 }}
//         transition={{ duration: 0.25, ease: "easeOut" }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }


