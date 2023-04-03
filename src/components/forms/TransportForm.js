import { Col, Row } from "antd";
import {
  Checkbox,
  DatePicker,
  Input,
  AlertInput,
  FileInput,
} from "../../components/index";
import { Spacing } from "../spacing";
import styled from "styled-components";

export const TransportForm = ({ form, onChange, canEdit, formType }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";

  return (
    <div>
      {(formType.type === "airfreight" ||
        formType.type === "charter" ||
        formType.type === "drf" ||
        formType.type === "") && (
        <div>
          <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

          <Col span={8}>
            <Input
              text="Client’s reference"
              value={form.clientReference}
              onChange={(value) => onChange("clientReference", value)}
              disabled={!canEdit}
            />
          </Col>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Col span={24}>
            <DatePicker
              text="Shipment confirmation"
              value={form.confirmationDate}
              onChange={(value) => onChange("confirmationDate", value)}
              disabled={!canEdit}
            />
          </Col>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col span={5}>
              <Checkbox
                label="Shipper contacted"
                value={form.contacted}
                onChange={(value) => onChange("contacted", value)}
                disabled={!canEdit}
              />
            </Col>

            {formType.type !== "drf" && (
              <Col span={7}>
                <Checkbox
                  label="Capacity booked with airline"
                  value={form.capacityBooked}
                  onChange={(value) => onChange("capacityBooked", value)}
                  disabled={!canEdit}
                />
              </Col>
            )}

            {form.klicEnabled === true && (
              <Col span={6}>
                <Checkbox
                  label="Export customs done"
                  value={form.exportCustoms}
                  onChange={(value) => onChange("exportCustoms", value)}
                  disabled={!canEdit}
                />
              </Col>
            )}
            {form.klicEnabled === false && null}

            <Col span={6}>
              {canEdit && (
                <Checkbox
                  label="Enable customs"
                  onChange={(value) => onChange("klicEnabled", value)}
                  value={form.klicEnabled}
                />
              )}
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Col>
            <TextContainer>{"Documents obtained "}</TextContainer>

            <FileInput
              setFiles={(files) =>
                onChange("documents", [...form.documents, ...files])
              }
              removeFile={(link) =>
                onChange(
                  "documents",
                  form.documents.filter((file) => file.link !== link)
                )
              }
              files={form.documents}
              canEdit={canEdit}
            />
          </Col>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          {(isDelayed || isLate) && (
            <AlertInput
              canEdit={canEdit}
              form={form}
              value={form.reasonOfDelay}
              onChange={(value) => onChange("reasonOfDelay", value)}
            />
          )}

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />
        </div>
      )}

      {formType.type === "obc" && (
        <div>
          <Row>
            <Col span={7}>
              <Input
                text="Client’s reference"
                value={form.clientReference}
                onChange={(value) => onChange("clientReference", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col span={8}>
              <DatePicker
                text="Shipment confirmation"
                value={form.confirmationDate}
                onChange={(value) => onChange("confirmationDate", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col span={7}>
              <Input
                text="Courier name"
                value={form.courierName}
                onChange={(value) => onChange("courierName", value)}
                disabled={!canEdit}
              />
            </Col>

            <Spacing
              size={Spacing.SIZES.SIZE_20}
              type={Spacing.TYPES.HORIZONTAL}
            />

            <Col span={7}>
              <Input
                text="Courier phone"
                value={form.courierPhone}
                onChange={(value) => onChange("courierPhone", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Checkbox
                label="Shipper contacted"
                value={form.contacted}
                onChange={(value) => onChange("contacted", value)}
                disabled={!canEdit}
              />
            </Col>
            <Col span={8}>
              <Checkbox
                label="Flight tickets booked with the airline"
                value={form.ticketsBooked}
                onChange={(value) => onChange("ticketsBooked", value)}
                disabled={!canEdit}
              />
            </Col>
            <Col span={6}>
              <Checkbox
                label="OBC courier reserved"
                value={form.currierReserved}
                onChange={(value) => onChange("currierReserved", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col span={8}>
              <TextContainer>{"Documents obtained "}</TextContainer>

              <FileInput
                canEdit={canEdit}
                setFiles={(files) =>
                  onChange("documents", [...form.documents, ...files])
                }
                removeFile={(link) =>
                  onChange(
                    "documents",
                    form.documents.filter((file) => file.link !== link)
                  )
                }
                files={form.documents}
              />
            </Col>
            <Col span={8}>
              <TextContainer>{"Flight itinerary "}</TextContainer>
              <FileInput
                canEdit={canEdit}
                setFiles={(files) =>
                  onChange("itinerary", [...form.itinerary, ...files])
                }
                removeFile={(link) =>
                  onChange(
                    "itinerary",
                    form.itinerary.filter((file) => file.link !== link)
                  )
                }
                files={form.itinerary}
              />
            </Col>
            <Col>
              <TextContainer>{"Passport "}</TextContainer>

              <FileInput
                canEdit={canEdit}
                setFiles={(files) =>
                  onChange("passport", [...form.passport, ...files])
                }
                removeFile={(link) =>
                  onChange(
                    "passport",
                    form.passport.filter((file) => file.link !== link)
                  )
                }
                files={form.passport}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          {(isDelayed || isLate) && (
            <AlertInput
              canEdit={canEdit}
              value={form.reasonOfDelay}
              form={form}
              onChange={(value) => onChange("reasonOfDelay", value)}
            />
          )}

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />
        </div>
      )}
    </div>
  );
};

const TextContainer = styled.span`
   {
    font-weight: 300;
    font-size: 16px;
    margin-right: 10px;
  }
`;
