import { expect, it, describe } from "vitest";
import { GitHubInbox } from "../src";

describe("GitHubInbox", () => {
    it("should be defined", () => {
        expect(GitHubInbox).toBeDefined();
    });
    
    it("should be able to set the fetch interval", async () => {
        const inbox = new GitHubInbox("");
        await inbox.initialize();
        // inbox.setFetchInterval(30);
        // expect(inbox.fetchInterval).toBe(30);
    });
});