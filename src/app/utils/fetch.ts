import axios, { AxiosResponse } from "axios";

export const createSession = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post("/api/store/session/create");
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

interface StoryPointsRequest {
  storyPoints: number;
  sessionKey: string;
  username: string;
}

export const sendStoryPoints = async (request: StoryPointsRequest): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post("/api/store/story-point", request);
    return response.data;
  } catch (error) {
    console.error("Error sending story points:", error);
    throw error;
  }
};

export const retrieveSessionData = async (sessionKey: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get("/api/store/session/retrieve", {
      params: {
        sessionKey: sessionKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving session data:", error);
    throw error;
  }
};

export const deleteStoryPoint = async (body: Partial<StoryPointsRequest>): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete("/api/store/story-point/delete", {
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting story points:", error);
    throw error;
  }
};
