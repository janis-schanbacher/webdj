import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import { Wrapper, Cover, MetaInformation, Title } from "./styles/SongMetadata.styles";

const SongMetadata = ({ metadata }) => {
  const getImageUrl = () => {
    if (metadata.picture) {
      const blob = new Blob([metadata.picture[0].data], { type: "image/png" });
      const urlCreator = window.URL || window.webkitURL;
      return urlCreator.createObjectURL(blob);
    }
    return "assets/cover_placeholder.svg";
  };

  return (
    <Wrapper>
      <Row>
        <Col span={5}>
          <Cover src={getImageUrl()} alt="Cover" width="70" height="70" />
        </Col>
        <Col span={18}>
          <MetaInformation>
            <Title level={3}>{metadata.title}</Title>
            {metadata.artist}<br />
            {metadata.bpm > 0 && `${metadata.bpm} bpm`}
          </MetaInformation>
        </Col>
      </Row>
    </Wrapper>
  );
};

SongMetadata.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default SongMetadata;
