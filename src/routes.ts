import * as express from "express";
import { Router } from "express";
import { BaseRoutes } from "@timetree/base-service";
import * as multer from "multer";

import mediaService, { FileService } from "./service";

const upload = multer();

export class MediaRoutes extends BaseRoutes<FileService> {
  public router: Router;
  constructor() {
    const router = express.Router();
    super(router, mediaService);
    this.router = router;
  }

  initHandlers(service: FileService) {
    super.initHandlers(service);
    this.update = this.notallowed;
    this.readall = this.routeHandler(service.getAllMedia, req => [
      req.user || null,
      req.query.criteria ? JSON.parse(req.query.criteria) : null,
      +req.query.skip,
      +req.query.limit,
      (req.query.pagination || "true") === "true",
      req.query.sort || null
    ]);
  }

  initRoutes(router: Router) {
    super.initRoutes(router);
    router.post(
      "/:entity/:id",
      upload.single("file"),
      this.routeHandler(mediaService.addmedia, req => [
        req.params.entity,
        req.params.id,
        req.file,
        req.user.id
      ])
    );
    router.delete(
      "/:id/delete",
      this.routeHandler(mediaService.deleteMedia, req => [req.params.id])
    );
  }
}

export default function() {
  const mr = new MediaRoutes();
  return mr.router;
}
