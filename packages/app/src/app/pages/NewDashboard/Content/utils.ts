import { uniqBy } from 'lodash-es';
import getDefinition, { TemplateType } from '@codesandbox/common/lib/templates';
import {
  TemplateFragmentDashboardFragment,
  SandboxFragmentDashboardFragment,
} from 'app/graphql/types';

export type TemplateFilter = {
  id: string;
  color: () => string;
  name: string;
  niceName: string;
};

export function getPossibleTemplates(
  sandboxes: Array<
    SandboxFragmentDashboardFragment | TemplateFragmentDashboardFragment
  >
): TemplateFilter[] {
  if (!sandboxes) return [];
  return uniqBy(
    sandboxes.map(x => {
      // @ts-ignore TODO: check if we need to set this for template as well
      const templateId = x.source?.template as TemplateType;
      const template = getDefinition(templateId);

      return {
        id: templateId,
        color: template.color,
        name: template.name,
        niceName: template.niceName,
      };
    }),
    template => template.id
  );
}
