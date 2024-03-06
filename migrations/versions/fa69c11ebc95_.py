"""empty message

Revision ID: fa69c11ebc95
Revises: 1c8eaee8563c
Create Date: 2024-03-06 20:06:09.387405

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa69c11ebc95'
down_revision = '1c8eaee8563c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('lgtbi', sa.Boolean(), nullable=True))
        batch_op.drop_index('ix_event_lgbti')
        batch_op.create_index(batch_op.f('ix_event_lgtbi'), ['lgtbi'], unique=False)
        batch_op.drop_column('lgbti')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('lgbti', sa.BOOLEAN(), autoincrement=False, nullable=True))
        batch_op.drop_index(batch_op.f('ix_event_lgtbi'))
        batch_op.create_index('ix_event_lgbti', ['lgbti'], unique=False)
        batch_op.drop_column('lgtbi')

    # ### end Alembic commands ###
