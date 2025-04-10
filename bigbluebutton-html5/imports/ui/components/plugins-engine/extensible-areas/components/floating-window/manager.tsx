import { useEffect, useState, useContext } from 'react';
import * as PluginSdk from 'bigbluebutton-html-plugin-sdk';

import {
  ExtensibleAreaComponentManagerProps, ExtensibleArea,
  ExtensibleAreaComponentManager,
} from '../../types';
import { PluginsContext } from '../../../../components-data/plugin-context/context';

const FloatingWindowPluginStateContainer = ((
  props: ExtensibleAreaComponentManagerProps,
) => {
  const {
    uuid,
    generateItemWithId,
    extensibleAreaMap,
    pluginApi,
  } = props;
  const [
    floatingWindows,
    setFloatingWindows,
  ] = useState<PluginSdk.FloatingWindowInterface[]>([]);

  const {
    pluginsExtensibleAreasAggregatedState,
    setPluginsExtensibleAreasAggregatedState,
  } = useContext(PluginsContext);

  useEffect(() => {
    // Change this plugin provided toolbar items
    extensibleAreaMap[uuid].floatingWindows = floatingWindows;

    // Update context with computed aggregated list of all plugin provided toolbar items
    const aggregatedFloatingWindows = (
      [] as PluginSdk.FloatingWindowInterface[]).concat(
      ...Object.values(extensibleAreaMap)
        .map((extensibleArea: ExtensibleArea) => extensibleArea.floatingWindows),
    );
    setPluginsExtensibleAreasAggregatedState(
      {
        ...pluginsExtensibleAreasAggregatedState,
        floatingWindows: aggregatedFloatingWindows,
      },
    );
  }, [floatingWindows]);

  pluginApi.setFloatingWindows = (items: PluginSdk.FloatingWindowInterface[]) => {
    const itemsWithId = items.map(generateItemWithId) as PluginSdk.FloatingWindowInterface[];
    return setFloatingWindows(itemsWithId);
  };
  return null;
}) as ExtensibleAreaComponentManager;

export default FloatingWindowPluginStateContainer;
