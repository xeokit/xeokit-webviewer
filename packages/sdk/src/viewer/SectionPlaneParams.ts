import type {FloatArrayParam} from "../math";

/**
 * Configuration for a {@link SectionPlane}.
 *
 * * Returned by {@link SectionPlane.getJSON | SectionPlane.getJSON}
 * * Located at {@link ViewParams.sectionPlanes | ViewParams.sectionPlanes}
 */
export interface SectionPlaneParams {
    id?: string;
    pos?: FloatArrayParam;
    active?: boolean;
    dir?: FloatArrayParam

}
