import { FileService } from "./service";
import { Model, Document } from "mongoose";

import mediaRoutes from "./routes";
import MediaModel from "./media/media.model";
export interface FileConfigOptions {
  connectionString: string;
  useMediaModel?: boolean;
  mediaModel?: Model<Document>;
  useInternalRoutes?: boolean;
}

export class FileConfig {
  public static options: FileConfigOptions;
  private fileService;
  constructor(app, options?) {
    FileConfig.options = options;
    FileConfig.options.connectionString = options.connectionString;
    let model;
    if (options.useMediaModel) {
      if (options.mediaModel) {
        model = options.mediaModel;
      } else {
        model = MediaModel;
      }
    }
    if (model) {
      this.fileService = new FileService(model);
    } else {
      this.fileService = new FileService();
    }

    if (options.useInternalRoutes) {
      app.use("/media", mediaRoutes());
    }
  }

  public getService() {
    return this.fileService;
  }
}
