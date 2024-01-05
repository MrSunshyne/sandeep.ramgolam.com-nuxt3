const transitionName = (name: string, entity: string = "generic") => {
  const safe_name = name.replace(/\s/g, "-");
  const safe_entity = entity.replace(/\s/g, "-");
  return `view-transition-name: ${safe_name}-${safe_entity};`;
};

export { transitionName };
