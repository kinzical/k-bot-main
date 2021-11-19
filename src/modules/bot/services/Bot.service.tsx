import { AnswerVM } from "../models/classes/answer.classes";
import { ActivityDTO } from "../models/classes/DTOs/activityDTO.classes";
import { BotRepository, botRepository } from "../repository/Bot.repository";

export class BotService {
  private static instance: BotService;
  private _botRepository: BotRepository;
  private constructor() {
    this._botRepository = botRepository;
  }

  static getInstance() {
    if (!BotService.instance) {
      BotService.instance = new BotService();
    }
    return BotService.instance;
  }

  public getRoomId() {
    return this._botRepository.getRoomId();
  }

  public setRoomId(roomId: string) {
    this._botRepository.setRoomId(roomId);
  }

  public verifyChatId(id: string) {
    return this._botRepository.verifyChatId(id);
  }

  public getTransformedActivity(activityDTO: ActivityDTO) {
    return this._botRepository.getTransformedActivity(activityDTO);
  }

  public getTransformedAnswer(activityType: string, answer: AnswerVM) {
    return this._botRepository.getTransformedAnswer(activityType, answer);
  }

  public uploadFile(file: File, clientMemberId: string, candidateId: string, fileType: string) {
    return this._botRepository.uploadFile(file, clientMemberId, candidateId, fileType);
  }
}

export const botService = BotService.getInstance();
