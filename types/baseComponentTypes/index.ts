export interface ComplexListProps {
  title: string;
  icon?: string;
  iconClass?: string;
  description?: string;
  image?: string;
  to?: string;
  linkTarget?: "_self" | "_blank";
}

export interface CollapsableListItem extends ComplexListProps {
  active?: boolean;
  route?: string;
  subItems?: CollapsableListItem[];
}
