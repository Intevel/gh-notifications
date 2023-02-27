import { ofetch } from "ofetch";
import { GitHubNotification, GitHubNotificationsQuery } from "./types";

export class GitHubInbox {
  fetchInterval: number;
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fetchInterval = 60;
  }

  async initialize(): Promise<void> {
    await this.fetchNotifications();
  }

  async fetchUnreadNotifications(options: GitHubNotificationsQuery = { all: false }): Promise<GitHubNotification[] | []> {
    let newInterval;

    try {
      const response = await ofetch<GitHubNotification[]>(`https://api.github.com/notifications`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/vnd.github+json",
        },
        query: options,
        async onResponse({ request, response, options }) {
          newInterval = response.headers.get("x-poll-interval");
        },
      });
  
      if (newInterval) {
        this.setFetchInterval(newInterval);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchNotifications(options: GitHubNotificationsQuery = { all: true }): Promise<GitHubNotification[] | []> {
    let newInterval;
    
    try {
      const response = await ofetch<GitHubNotification[]>(`https://api.github.com/notifications`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/vnd.github+json",
        },
        query: options,
        async onResponse({ request, response, options }) {
          newInterval = response.headers.get("x-poll-interval");
        },
      });
  
      if (newInterval) {
        this.setFetchInterval(newInterval);
      }
  
      return response;
    } catch(error) {
      console.error(error);
      throw error;
    }

  }

  async markAsRead (id: string): Promise<void> {
    try {
      await ofetch(`https://api.github.com/notifications/threads/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/vnd.github+json",
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getFetchInterval(): number {
    return this.fetchInterval;
  }

  setFetchInterval(interval: number) {
    this.fetchInterval = interval;
  }
}
