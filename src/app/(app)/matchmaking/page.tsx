import { MatchmakingClient } from "./client";

export default function MatchmakingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">AI-Powered Matchmaking</h1>
                <p className="text-muted-foreground">
                    Find the perfect collaborators for your project by detailing your needs.
                </p>
            </div>
            <MatchmakingClient />
        </div>
    )
}
