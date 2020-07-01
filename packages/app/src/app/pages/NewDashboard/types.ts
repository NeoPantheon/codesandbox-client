import {
  SandboxFragmentDashboardFragment,
  TemplateFragmentDashboardFragment,
  RepoFragmentDashboardFragment,
} from 'app/graphql/types';
import { DELETE_ME_COLLECTION } from 'app/overmind/namespaces/dashboard/state';

export type DashboardBaseFolder = {
  name: string;
  path: string;
  parent: string | null;
};

export type DashboardSandbox = {
  type: 'sandbox';
  sandbox: SandboxFragmentDashboardFragment & {
    prNumber?: number;
    originalGit?: RepoFragmentDashboardFragment['originalGit'];
  };
  isHomeTemplate?: false;
};

export type DashboardTemplate = {
  type: 'template';
  template: Omit<TemplateFragmentDashboardFragment, 'sandbox'>;
  sandbox: TemplateFragmentDashboardFragment['sandbox'] & {
    prNumber?: number;
    originalGit?: RepoFragmentDashboardFragment['originalGit'];
  };
  isHomeTemplate?: boolean;
};

export type DashboardFolder = DELETE_ME_COLLECTION &
  DashboardBaseFolder & {
    type: 'folder';
  };

export type DashboardRepo = {
  type: 'repo';
  path?: string;
  lastEdited?: Date;
  branch: string;
  name: string;
  owner: string;
  sandboxes: RepoFragmentDashboardFragment[];
  isScrolling?: boolean;
};

export type DashboardRepoSandbox = {
  type: 'sandbox';
  sandbox: RepoFragmentDashboardFragment;
};

export type DashboardNewFolder = {
  type: 'new-folder';
  basePath: string;
  setCreating: (value: boolean) => void;
};

export type DashboardHeader = {
  type: 'header';
  title: string;
  showMoreLink?: string;
  showMoreLabel?: string;
};

export type DashboardNewSandbox = {
  type: 'new-sandbox';
};

export type DashboardNewRepo = {
  type: 'new-repo';
};

export type DashboardSkeletonRow = {
  type: 'skeleton-row';
};

export type DashboardHeaderLink = {
  type: 'header-link';
  label: string;
  link: string;
};

export type DashboardBlank = {
  type: 'blank';
};

/**
 * Try to fill the row with blanks until it's filled
 */
export type DashboardBlankRowFill = {
  type: 'blank-row-fill';
};

export type DashboardSkeleton = {
  type: 'skeleton';
};

export type DashboardNewMasterBranch = {
  type: 'new-master-branch';
  repo: {
    owner: string;
    name: string;
    branch: string;
  };
};

export type PageTypes =
  | 'search'
  | 'home'
  | 'recents'
  | 'deleted'
  | 'templates'
  | 'drafts'
  | 'sandboxes'
  | 'repos';

export type DashboardGridItem =
  | DashboardSandbox
  | DashboardTemplate
  | DashboardFolder
  | DashboardHeader
  | DashboardHeaderLink
  | DashboardNewFolder
  | DashboardNewSandbox
  | DashboardNewRepo
  | DashboardSkeletonRow
  | DashboardNewMasterBranch
  | DashboardBlank
  | DashboardRepo
  | DashboardRepoSandbox
  | DashboardBlankRowFill
  | DashboardSkeleton;
