# User Online Presence (Green Dot) Feature

## Current State

The green dot **already exists visually** in `server-member.tsx` (line 47):

```tsx
<span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-[2px] ring-sidebar-secondary bg-accent" />
```

However, this is **purely cosmetic — it's hardcoded ON for every member at all times**, with no real-time tracking logic behind it. The dot uses `bg-accent` (a teal/green color from the theme), but never reflects actual online/offline state.

**Nothing else in the codebase implements presence:**
- No `isOnline` / `lastSeen` field on the `Profile` or `Member` Prisma model
- No Pusher presence channel subscription
- No heartbeat / ping mechanism
- No hook or context for tracking active users

---

## Edge Cases Handled

| Scenario | How It's Handled |
|---|---|
| Tab closed | Pusher fires `pusher:member_removed` automatically when the WebSocket disconnects |
| Browser closed | Same as above — WebSocket connection drops, Pusher triggers `member_removed` |
| System crash / shutdown | Pusher has a ~30s timeout; after the socket heartbeat stops, `member_removed` fires |
| User signs out (Clerk) | Component unmounts → unsubscribes from presence channel → `member_removed` fires |
| Multiple tabs open | User stays "online" as long as at least one tab is subscribed |
| Network flicker | Pusher client auto-reconnects; brief offline state may flash but recovers |

---

## Solution: Pusher Presence Channels

The project already has Pusher fully configured (`lib/pusher.ts` + `/api/pusher/auth`). Pusher Presence Channels track member joins/leaves server-side with no database changes needed.

A presence channel is named: `presence-server-{serverId}`

---

## Architecture Flow

```
User Opens App
      │
      ▼
useOnlineUsers(serverId) hook
      │
      ├─► Subscribes to presence-server-{serverId} via Pusher
      │         │
      │         ├─► pusher:member_added  → add profileId to onlineSet
      │         ├─► pusher:member_removed → remove profileId from onlineSet
      │         └─► pusher:subscription_succeeded → seed initial online members
      │
      ▼
isOnline(profileId) → true | false
      │
      ▼
ServerMember component → show green or grey dot
ChatHeader component   → show green or grey dot next to DM avatar
```

---

## Files Changed

### New Files
- `hooks/use-online-users.ts` — Pusher presence hook

### Modified Files
- `pages/api/pusher/auth.ts` — Add `user_id: profile.id` + `user_info` to presence channel auth
- `components/server/server-member.tsx` — Consume `useOnlineUsers`, conditional dot color
- `components/chat/chat-header.tsx` — Add `profileId` prop + online dot for DM conversations

---

## Verification

1. Open two browser windows logged in as different users in the same server
2. Verify green dot appears for each user in the sidebar member list
3. Close one browser window → dot disappears for that user within ~30 seconds
4. Sign out from Clerk → dot disappears immediately
5. Crash simulation: DevTools → Network → Offline → dot goes grey after timeout
