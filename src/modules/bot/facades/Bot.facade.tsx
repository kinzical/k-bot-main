import { coreFacade } from "../../core/facades/Core.facade";
import { AnswerVM } from "../models/classes/answer.classes";
import { Campaign } from "../models/classes/campaign.classes";
import { ActivityDTO } from "../models/classes/DTOs/activityDTO.classes";
import { BotService, botService } from "../services/Bot.service";

export class BotFacade {
  private static instance: BotFacade;
  private _botService: BotService;
  private _campaignDetails: Campaign;

  private constructor() {
    this._botService = botService;
    this._campaignDetails = new Campaign();
  }

  static getInstance() {
    if (!BotFacade.instance) {
      BotFacade.instance = new BotFacade();
    }
    return BotFacade.instance;
  }

  public getRoomId() {
    return this._botService.getRoomId();
  }

  public setRoomId(roomId: string) {
    this._botService.setRoomId(roomId);
  }

  public verifyChatId(id: string) {
    return this._botService.verifyChatId(id);
  }

  public setCampaignDetails(data: Campaign) {
    this._campaignDetails = data;
  }

  public getCampaignDetails() {
    return this._campaignDetails;
  }

  public getChatConnectedPayload(event: string) {
    return {
      user: ["backend", "chat_engine"],
      timestamp: new Date().toISOString(),
      event: event,
      chat_room_id: this.getRoomId(),
      language_id: coreFacade.getLanguageId(),
      data: {},
      created_by: "frontend",
      browser_details: coreFacade.getBrowserData(),
    };
  }

  public getResponsePayload(event: string, answer: any, activityId: number) {
    return {
      user: ["backend", "chat_engine"],
      timestamp: new Date().toISOString(),
      event: event,
      chat_room_id: this.getRoomId(),
      language_id: coreFacade.getLanguageId(),
      data: {
        activity_id: activityId,
        response: answer,
      },
      created_by: "frontend",
      browser_details: coreFacade.getBrowserData(),
    };
  }

  public getSkipQuestionPayload(event: string, question_id: number) {
    let postData: any = { activity_id: question_id };

    return {
      user: ["backend", "chat_engine"],
      timestamp: new Date().toISOString(),
      event: event,
      chat_room_id: this.getRoomId(),
      language_id: coreFacade.getLanguageId(),
      data: postData,
      created_by: "frontend",
      browser_details: coreFacade.getBrowserData(),
    };
  }

  public getTransformedActivity(activityDTO: ActivityDTO) {
    return this._botService.getTransformedActivity(activityDTO);
  }

  public getTransformedAnswer(activityType: string, answer: AnswerVM) {
    return this._botService.getTransformedAnswer(activityType, answer);
  }

  public uploadFile(file: File, clientMemberId: string, candidateId: string, fileType: string) {
    return this._botService.uploadFile(file, clientMemberId, candidateId, fileType);
  }
}

export const botFacade = BotFacade.getInstance();
