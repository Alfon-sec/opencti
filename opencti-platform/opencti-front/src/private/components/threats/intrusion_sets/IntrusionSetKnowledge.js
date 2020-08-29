import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import inject18n from '../../../../components/i18n';
import IntrusionSetPopover from './IntrusionSetPopover';
import EntityStixCoreRelationships from '../../common/stix_core_relationships/EntityStixCoreRelationships';
import StixDomainObjectThreatKnowledge from '../../common/stix_domain_objects/StixDomainObjectThreatKnowledge';
import StixCoreRelationship from '../../common/stix_core_relationships/StixCoreRelationship';
import StixDomainObjectHeader from '../../common/stix_domain_objects/StixDomainObjectHeader';
import StixDomainObjectKillChain from '../../common/stix_domain_objects/StixDomainObjectKillChain';
import StixDomainObjectVictimology from '../../common/stix_domain_objects/StixDomainObjectVictimology';
import StixCoreObjectKnowledgeBar from '../../common/stix_core_objects/StixCoreObjectKnowledgeBar';

const styles = () => ({
  container: {
    margin: 0,
    padding: '0 200px 0 0',
  },
});

class IntrusionSetKnowledgeComponent extends Component {
  render() {
    const { classes, intrusionSet } = this.props;
    const link = `/dashboard/threats/intrusion_sets/${intrusionSet.id}/knowledge`;
    return (
      <div className={classes.container}>
        <StixDomainObjectHeader
          stixDomainObject={intrusionSet}
          PopoverComponent={<IntrusionSetPopover />}
        />
        <StixCoreObjectKnowledgeBar
          stixCoreObjectLink={link}
          availableSections={[
            'victimology',
            'attribution',
            'campaigns',
            'incidents',
            'malwares',
            'attack_patterns',
            'tools',
            'vulnerabilities',
            'observables',
            'sightings',
          ]}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/relations/:relationId"
          render={(routeProps) => (
            <StixCoreRelationship
              entityId={intrusionSet.id}
              paddingRight={true}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/overview"
          render={(routeProps) => (
            <StixDomainObjectThreatKnowledge
              stixDomainObjectId={intrusionSet.id}
              stixDomainObjectType="Intrusion-Set"
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/attribution"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="attributed-to"
              targetStixDomainObjectTypes={['Threat-Actor']}
              entityLink={link}
              isRelationReversed={false}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/victimology"
          render={(routeProps) => (
            <StixDomainObjectVictimology
              stixDomainObjectId={intrusionSet.id}
              entityLink={link}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/campaigns"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="attributed-to"
              targetStixDomainObjectTypes={['Campaign']}
              entityLink={link}
              isRelationReversed={true}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/attack_patterns"
          render={(routeProps) => (
            <StixDomainObjectKillChain
              stixDomainObjectId={intrusionSet.id}
              entityLink={link}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/malwares"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="uses"
              targetStixDomainObjectTypes={['Malware']}
              entityLink={link}
              isRelationReversed={false}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/tools"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="uses"
              targetStixDomainObjectTypes={['Tool']}
              entityLink={link}
              isRelationReversed={false}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/vulnerabilities"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="targets"
              targetStixDomainObjectTypes={['Vulnerability']}
              entityLink={link}
              isRelationReversed={false}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/threats/intrusion_sets/:intrusionSetId/knowledge/incidents"
          render={(routeProps) => (
            <EntityStixCoreRelationships
              entityId={intrusionSet.id}
              relationshipType="attributed-to"
              targetStixDomainObjectTypes={['XOpenCTIIncident']}
              entityLink={link}
              isRelationReversed={true}
              {...routeProps}
            />
          )}
        />
      </div>
    );
  }
}

IntrusionSetKnowledgeComponent.propTypes = {
  intrusionSet: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
};

const IntrusionSetKnowledge = createFragmentContainer(
  IntrusionSetKnowledgeComponent,
  {
    intrusionSet: graphql`
      fragment IntrusionSetKnowledge_intrusionSet on IntrusionSet {
        id
        name
        aliases
      }
    `,
  },
);

export default compose(
  inject18n,
  withRouter,
  withStyles(styles),
)(IntrusionSetKnowledge);
